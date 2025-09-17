import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Upload,
  DollarSign,
  Calendar,
  MapPin,
  FileText,
  Save,
} from "lucide-react";
import Layout from "../../components/shared/Layout";
import { auth } from "../../dev/firebase";
import { getAsset, updateAsset } from "../../services/assets";
import { onAuthStateChanged } from "firebase/auth";
import { getTrend } from "../../utils";

const AssetsEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get asset ID from the URL
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    purchaseValue: "",
    currentValue: "",
    purchaseDate: "",
    location: "",
    description: "",
    trend: "",
    documents: [], // This will hold existing docs (as URLs) and new files (as File objects)
  });
  const [loading, setLoading] = useState(true); // Start true to indicate initial data fetch
  const [saving, setSaving] = useState(false); // For the submit button
  const [userId, setUserId] = useState(null);
  const [trend, setTrend] = useState("");

  const assetTypes = [
    "Real Estate",
    "Vehicle",
    "Investment",
    "Equipment",
    "Jewelry",
    "Art & Collectibles",
    "Other",
  ];

  // Step 1: Fetch existing asset data from Firestore
  useEffect(() => {
    if (!id) return;

    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        const fetchAssetData = async () => {
          try {
            const assetData = await getAsset(user.uid, id);
            if (assetData) {
              // Format date for the input field (Firebase timestamp -> YYYY-MM-DD)
              const purchaseDate = assetData.purchaseDate?.toDate
                ? assetData.purchaseDate.toDate().toISOString().split("T")[0]
                : "";

              const documents = assetData.documents || [];

              setFormData({ ...assetData, purchaseDate, documents });
            } else {
              console.error("Asset not found!");
              navigate("/assets"); // Redirect if asset doesn't exist
            }
          } catch (error) {
            console.error("Error fetching asset:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchAssetData();
      } else {
        navigate("/login");
      }
    });

    return () => unsub();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      documents: [...prev.documents, ...newFiles],
    }));
  };

  const removeDocument = (index) => {
    // Note: This only removes from the UI. Deletion from storage happens on save.
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  // Step 2: Update the asset in Firestore and upload new files to Storage
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      console.error("No user logged in.");
      return;
    }
    setSaving(true);

    try {
      formData.trend = getTrend(formData.currentValue, formData.purchaseValue)
      console.log(formData.currentValue, formData.purchaseValue)
      console.log(formData)
      
      // Separate existing document URLs from new File objects
      const existingDocs = formData.documents.filter(
        (doc) => typeof doc === "string"
      );
      const newFiles = formData.documents.filter(
        (doc) => typeof doc !== "string"
      );

      // Pass the form data, user ID, asset ID, and new files to the service
      await updateAsset(userId, id, formData, newFiles, existingDocs);

      navigate("/assets");
    } catch (error) {
      console.error("Error updating asset:", error);
      alert("Failed to update asset. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const currentValue = Number.parseFloat(formData.currentValue) || 0;
  const purchaseValue = Number.parseFloat(formData.purchaseValue) || 0;
  const valueChange = currentValue - purchaseValue;
  const valueChangePercent =
    purchaseValue > 0 ? ((valueChange / purchaseValue) * 100).toFixed(1) : 0;

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => navigate("/assets")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Asset</h1>
            <p className="text-gray-600">
              Update asset information and valuation
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Asset Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="e.g., Downtown Apartment, 2023 Tesla Model S"
                  />
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Asset Type *
                  </label>
                  <select
                    id="type"
                    name="type"
                    required
                    value={formData.type}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select asset type</option>
                    {assetTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Financial Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="purchaseValue"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Purchase Value *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="purchaseValue"
                      name="purchaseValue"
                      required
                      value={formData.purchaseValue}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="currentValue"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Current Value *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="currentValue"
                      name="currentValue"
                      required
                      value={formData.currentValue}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="purchaseDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Purchase Date *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="purchaseDate"
                      name="purchaseDate"
                      required
                      value={formData.purchaseDate}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Value Change Display */}
                <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Value Change</p>
                    <p
                      className={`text-lg font-semibold ${
                        valueChange >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {valueChange >= 0 ? "+" : ""}$
                      {valueChange.toLocaleString()}
                    </p>
                    <p
                      className={`text-sm ${
                        valueChange >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {valueChange >= 0 ? "+" : ""}
                      {valueChangePercent}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Location & Details
              </h2>
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Location
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="e.g., New York, NY or Portfolio"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Additional details about the asset..."
                  />
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Documents
              </h2>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-400 transition-colors">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload additional documents
                  </p>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Choose Files
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    PDF, DOC, JPG, PNG up to 10MB each
                  </p>
                </div>

                {/* Uploaded Files */}
                {formData.documents.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">
                      Documents
                    </h3>
                    {formData.documents.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDocument(index)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/assets")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving Changes...
                  </div>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AssetsEdit;
