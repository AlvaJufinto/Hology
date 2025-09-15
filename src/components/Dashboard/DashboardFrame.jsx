import { useState } from "react"
import Dashboard from "../../pages/Dashboard/Dashboard"

const DashboardFrame = () => {
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState({ name: "John Doe", email: "john@example.com" })

  // Assets state
  const [assets, setAssets] = useState([
    { id: 1, name: "Rumah Jakarta Selatan", type: "Property", value: 2500000000, growth: 12.5, status: "Active" },
    { id: 2, name: "Toyota Camry 2022", type: "Vehicle", value: 450000000, growth: -8.2, status: "Active" },
    { id: 3, name: "Saham BBRI", type: "Stock", value: 125000000, growth: 15.8, status: "Active" },
  ])

  // Notaries state
  const [notaries, setNotaries] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Property Law",
      rating: 4.9,
      location: "Jakarta",
      verified: true,
      experience: 15,
    },
    {
      id: 2,
      name: "Ahmad Rizki, S.H.",
      specialization: "Corporate Law",
      rating: 4.8,
      location: "Surabaya",
      verified: true,
      experience: 12,
    },
    {
      id: 3,
      name: "Maria Santos",
      specialization: "Family Law",
      rating: 4.7,
      location: "Bandung",
      verified: true,
      experience: 10,
    },
  ])

  // Reports state
  const [reports, setReports] = useState([
    { id: 1, title: "Portfolio Analysis Q4 2024", type: "Portfolio", date: "2024-12-15", status: "Completed" },
    { id: 2, title: "Asset Valuation Report", type: "Valuation", date: "2024-12-10", status: "In Progress" },
    { id: 3, title: "Risk Assessment Report", type: "Risk", date: "2024-12-05", status: "Completed" },
  ])

  const menuItems = [
    { id: "home", label: "Home", icon: "🏠" },
    { id: "assets", label: "Assets", icon: "💼" },
    { id: "notary", label: "Notary Finder", icon: "⚖️" },
    { id: "reports", label: "Reports", icon: "📊" },
    { id: "settings", label: "Settings", icon: "⚙️" },
    { id: "help", label: "Help", icon: "❓" },
  ]

  // Home Dashboard Component
  const HomeDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Asset Management Dashboard</h1>
        <p className="text-gray-600">Kelola aset Anda dengan kecerdasan buatan</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assets</p>
              <p className="text-2xl font-bold text-gray-900">Rp 3.1B</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <span className="text-teal-600 text-xl">💼</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">+12.5%</span>
            <span className="text-gray-600 text-sm ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Portfolio Growth</p>
              <p className="text-2xl font-bold text-gray-900">+8.2%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">📈</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">+2.1%</span>
            <span className="text-gray-600 text-sm ml-2">from last week</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI Predictions</p>
              <p className="text-2xl font-bold text-gray-900">94%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">🤖</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-blue-600 text-sm font-medium">Accuracy</span>
            <span className="text-gray-600 text-sm ml-2">this quarter</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Risk Score</p>
              <p className="text-2xl font-bold text-gray-900">Low</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-yellow-600 text-xl">🛡️</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-green-600 text-sm font-medium">Stable</span>
            <span className="text-gray-600 text-sm ml-2">portfolio</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Performance</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <p className="text-gray-600">Portfolio Chart</p>
              <p className="text-sm text-gray-500">Interactive chart will be displayed here</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Distribution</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🥧</div>
              <p className="text-gray-600">Distribution Chart</p>
              <p className="text-sm text-gray-500">Asset allocation visualization</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-sm p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">🤖 AI Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Market Prediction</h4>
            <p className="text-sm opacity-90">Property market expected to grow 15% in Q1 2025</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="font-medium mb-2">Recommendation</h4>
            <p className="text-sm opacity-90">Consider diversifying into tech stocks for better returns</p>
          </div>
        </div>
      </div>
    </div>
  )

  // Assets Component
  const AssetsComponent = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterType, setFilterType] = useState("all")
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [editingAsset, setEditingAsset] = useState(null)
    const [viewingAsset, setViewingAsset] = useState(null)

    const filteredAssets = assets.filter((asset) => {
      const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterType === "all" || asset.type.toLowerCase() === filterType.toLowerCase()
      return matchesSearch && matchesFilter
    })

    const CreateAssetForm = () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Create New Asset</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Asset Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                <option>Property</option>
                <option>Vehicle</option>
                <option>Stock</option>
                <option>Crypto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Value (Rp)</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
              >
                Create Asset
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )

    const AssetDetailView = ({ asset }) => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">{asset.name}</h3>
            <button onClick={() => setViewingAsset(null)} className="text-gray-500 hover:text-gray-700">
              <span className="text-2xl">×</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Asset Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{asset.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Value:</span>
                    <span className="font-medium">Rp {asset.value.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Growth:</span>
                    <span className={`font-medium ${asset.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                      {asset.growth > 0 ? "+" : ""}
                      {asset.growth}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-green-600">{asset.status}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-blue-900">🤖 AI Forecasting</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-700">6 Month Prediction:</span>
                    <span className="font-medium text-green-600">+18.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">12 Month Prediction:</span>
                    <span className="font-medium text-green-600">+25.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Risk Level:</span>
                    <span className="font-medium text-yellow-600">Medium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Confidence:</span>
                    <span className="font-medium text-blue-600">87%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Value Trend</h4>
                <div className="h-48 bg-white rounded border flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl mb-2">📈</div>
                    <p className="text-gray-600">Trend Chart</p>
                    <p className="text-sm text-gray-500">Historical value progression</p>
                  </div>
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-teal-900">AI Recommendations</h4>
                <div className="space-y-2">
                  <div className="bg-white rounded p-3">
                    <p className="text-sm text-teal-800">💡 Consider holding for long-term growth potential</p>
                  </div>
                  <div className="bg-white rounded p-3">
                    <p className="text-sm text-teal-800">📊 Market conditions favor this asset type</p>
                  </div>
                  <div className="bg-white rounded p-3">
                    <p className="text-sm text-teal-800">⚠️ Monitor for potential market volatility</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Asset Management</h2>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              + Add Asset
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="property">Property</option>
              <option value="vehicle">Vehicle</option>
              <option value="stock">Stock</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                  <p className="text-sm text-gray-600">{asset.type}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    asset.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {asset.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Value:</span>
                  <span className="font-medium">Rp {asset.value.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Growth:</span>
                  <span className={`font-medium ${asset.growth > 0 ? "text-green-600" : "text-red-600"}`}>
                    {asset.growth > 0 ? "+" : ""}
                    {asset.growth}%
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setViewingAsset(asset)}
                  className="flex-1 bg-teal-600 text-white py-2 px-3 rounded-lg hover:bg-teal-700 transition-colors text-sm"
                >
                  View Details
                </button>
                <button
                  onClick={() => setEditingAsset(asset)}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        {showCreateForm && <CreateAssetForm />}
        {viewingAsset && <AssetDetailView asset={viewingAsset} />}
      </div>
    )
  }

  // Notary Finder Component
  const NotaryFinderComponent = () => {
    const [searchLocation, setSearchLocation] = useState("")
    const [selectedSpecialization, setSelectedSpecialization] = useState("all")
    const [selectedNotary, setSelectedNotary] = useState(null)

    const filteredNotaries = notaries.filter((notary) => {
      const matchesLocation = notary.location.toLowerCase().includes(searchLocation.toLowerCase())
      const matchesSpecialization =
        selectedSpecialization === "all" ||
        notary.specialization.toLowerCase().includes(selectedSpecialization.toLowerCase())
      return matchesLocation && matchesSpecialization
    })

    const NotaryDetailModal = ({ notary }) => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">{notary.name}</h3>
            <button onClick={() => setSelectedNotary(null)} className="text-gray-500 hover:text-gray-700">
              <span className="text-2xl">×</span>
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <div>
                <h4 className="font-semibold text-lg">{notary.name}</h4>
                <p className="text-gray-600">{notary.specialization}</p>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="ml-2 text-sm text-gray-600">
                    {notary.rating} ({notary.experience} years exp.)
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold mb-2">Contact Information</h5>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-gray-600">Location:</span> {notary.location}
                  </p>
                  <p>
                    <span className="text-gray-600">Phone:</span> +62 812-3456-7890
                  </p>
                  <p>
                    <span className="text-gray-600">Email:</span> {notary.name.toLowerCase().replace(/\s+/g, ".")}
                    @notary.id
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-semibold mb-2">Services</h5>
                <div className="space-y-1 text-sm">
                  <p>• Property Documentation</p>
                  <p>• Legal Consultation</p>
                  <p>• Contract Verification</p>
                  <p>• Document Authentication</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h5 className="font-semibold mb-2 text-blue-900">Reviews</h5>
              <div className="space-y-3">
                <div className="bg-white rounded p-3">
                  <div className="flex items-center mb-1">
                    <span className="text-yellow-500 text-sm">★★★★★</span>
                    <span className="ml-2 font-medium text-sm">Excellent Service</span>
                  </div>
                  <p className="text-sm text-gray-600">"Very professional and thorough. Highly recommended!"</p>
                </div>
                <div className="bg-white rounded p-3">
                  <div className="flex items-center mb-1">
                    <span className="text-yellow-500 text-sm">★★★★★</span>
                    <span className="ml-2 font-medium text-sm">Fast and Reliable</span>
                  </div>
                  <p className="text-sm text-gray-600">"Quick turnaround time and very knowledgeable."</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors">
                Contact Notary
              </button>
              <button className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      </div>
    )

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Verified Notaries</h2>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="all">All Specializations</option>
              <option value="property">Property Law</option>
              <option value="corporate">Corporate Law</option>
              <option value="family">Family Law</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotaries.map((notary) => (
            <div key={notary.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xl">👨‍💼</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{notary.name}</h3>
                  <p className="text-sm text-gray-600">{notary.specialization}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500 text-sm">★★★★★</span>
                    <span className="ml-1 text-sm text-gray-600">{notary.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{notary.location}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Experience:</span>
                  <span className="font-medium">{notary.experience} years</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className="text-green-600 font-medium">✓ Verified</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedNotary(notary)}
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {selectedNotary && <NotaryDetailModal notary={selectedNotary} />}
      </div>
    )
  }

  // Reports Component
  const ReportsComponent = () => {
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [selectedReport, setSelectedReport] = useState(null)

    const CreateReportForm = () => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">Generate New Report</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                <option>Portfolio Analysis</option>
                <option>Asset Valuation</option>
                <option>Risk Assessment</option>
                <option>Performance Report</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                <option>Last 30 Days</option>
                <option>Last 3 Months</option>
                <option>Last 6 Months</option>
                <option>Last Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Include Assets</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm">All Assets</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Property Only</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Stocks Only</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
              >
                🤖 Generate Report
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">AI Report Generation</h2>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              🤖 Generate Report
            </button>
          </div>
          <p className="text-gray-600">Generate comprehensive reports with AI-powered insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-600">{report.type}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    report.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {report.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{report.date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{report.type}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 bg-teal-600 text-white py-2 px-3 rounded-lg hover:bg-teal-700 transition-colors text-sm">
                  View Report
                </button>
                <button className="flex-1 bg-gray-200 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-300 transition-colors text-sm">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {showCreateForm && <CreateReportForm />}
      </div>
    )
  }

  // Settings Component
  const SettingsComponent = () => {
    const [activeSettingsTab, setActiveSettingsTab] = useState("profile")

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>

          <div className="flex space-x-1 mb-6">
            {[
              { id: "profile", label: "Profile" },
              { id: "notifications", label: "Notifications" },
              { id: "security", label: "Security" },
              { id: "preferences", label: "Preferences" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSettingsTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeSettingsTab === tab.id ? "bg-teal-600 text-white" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeSettingsTab === "profile" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                Update Profile
              </button>
            </div>
          )}

          {activeSettingsTab === "notifications" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive updates via email</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-gray-600">Receive push notifications</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
            </div>
          )}

          {activeSettingsTab === "security" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">
                Update Password
              </button>
            </div>
          )}

          {activeSettingsTab === "preferences" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                  <option>English</option>
                  <option>Bahasa Indonesia</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent">
                  <option>IDR (Rupiah)</option>
                  <option>USD (Dollar)</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Help Component
  const HelpComponent = () => {
    const [selectedFaq, setSelectedFaq] = useState(null)

    const faqs = [
      {
        id: 1,
        question: "How do I add a new asset?",
        answer: 'Click the "Add Asset" button in the Assets section and fill out the form with your asset details.',
      },
      {
        id: 2,
        question: "How accurate are the AI predictions?",
        answer: "Our AI predictions have an average accuracy of 94% based on historical data and market analysis.",
      },
      {
        id: 3,
        question: "Can I export my reports?",
        answer: "Yes, you can download reports in PDF format from the Reports section.",
      },
    ]

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Help Center</h2>
          <p className="text-gray-600">Find answers to common questions and get support</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setSelectedFaq(selectedFaq === faq.id ? null : faq.id)}
                    className="w-full text-left p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{faq.question}</span>
                      <span className="text-gray-400">{selectedFaq === faq.id ? "−" : "+"}</span>
                    </div>
                  </button>
                  {selectedFaq === faq.id && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Contact Support</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <span className="text-teal-600">📧</span>
                </div>
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-gray-600">support@aiasset.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <span className="text-teal-600">💬</span>
                </div>
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-sm text-gray-600">Available 24/7</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                  <span className="text-teal-600">📞</span>
                </div>
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-gray-600">+62 21 1234 5678</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl shadow-sm p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">Need More Help?</h3>
          <p className="mb-4 opacity-90">
            Our support team is here to help you get the most out of your AI Asset Management System.
          </p>
          <button className="bg-white text-teal-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium">
            Contact Support
          </button>
        </div>
      </div>
    )
  }

  // Render current component based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Dashboard />
      case "assets":
        return <AssetsComponent />
      case "notary":
        return <NotaryFinderComponent />
      case "reports":
        return <ReportsComponent />
      case "settings":
        return <SettingsComponent />
      case "help":
        return <HelpComponent />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center h-16 px-4 bg-teal-600">
          <h1 className="text-xl font-bold text-white">AI Asset Manager</h1>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-teal-100 text-teal-700 border-r-2 border-teal-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">{user.name.charAt(0)}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-sm px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600 hover:text-gray-900">
            <span className="text-2xl">☰</span>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">AI Asset Manager</h1>
          <div className="w-8"></div>
        </div>

        {/* Page Content */}
        <main className="p-6">{renderContent()}</main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}

export default DashboardFrame
