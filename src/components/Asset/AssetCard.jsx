/** @format */

import { Edit, Eye, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { formatIDR } from "../../utils";
import { useEffect, useState } from "react";
import { db } from "../../dev/firebase";
import { deleteDoc, doc } from "firebase/firestore";

export default function AssetCard({ asset }) {
  const Icon = asset.icon;
  const pct =
    asset.purchaseValue > 0
      ? ((asset.currentValue - asset.purchaseValue) / asset.purchaseValue) * 100
      : 0;
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // Handle delete function here
    try {
      const ref = doc(db, "assets", asset.id);
      await deleteDoc(ref);
      console.log("Asset deleted:", asset.id);
    } catch (err) {
      console.error("Error deleting asset:", err);
      throw err;
    }
  };

  return (
    <div
      key={asset.id}
      className="bg-white rounded-xl shadow-sm p-6 hover:ring-1 hover:ring-gray-200 transition"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon className="h-6 w-6 text-teal-600" />
          <div>
            <h3 className="font-semibold text-gray-900">{asset.name}</h3>
            <p className="text-sm text-gray-500">{asset.type}</p>
          </div>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            asset.status === "Aktif"
              ? "bg-green-100 text-green-700"
              : asset.status === "Proses"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {asset.status}
        </span>
      </div>

      {/* Nilai */}
      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Nilai Saat Ini</span>
          <span className="font-semibold text-gray-900">
            {formatIDR(asset.currentValue)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Modal Awal</span>
          <span className="text-sm text-gray-500">
            {formatIDR(asset.purchaseValue)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Perubahan</span>
          <div className="flex items-center space-x-1">
            {asset.trend === "up" ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
            <span
              className={`text-sm font-medium ${
                asset.trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {(asset.trend === "up" ? "+" : "") + pct.toFixed(1) + "%"}
            </span>
          </div>
        </div>
      </div>

      {/* Lokasi & Update */}
      <div className="text-xs text-gray-500 mb-4">
        <p>{asset.location}</p>
        <p>Update: {new Date(asset.lastUpdated).toLocaleDateString("id-ID")}</p>
      </div>

      {/* Aksi */}
      <div className="flex space-x-2">
        <Link
          to={`/assets/view/${asset.id}`}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          <Eye className="inline h-4 w-4 mr-1" />
          Lihat
        </Link>
        <Link
          to={`/assets/edit/${asset.id}`}
          className="flex-1 bg-teal-600 text-white rounded-lg px-3 py-2 text-sm hover:bg-teal-700"
        >
          <Edit className="inline h-4 w-4 mr-1" />
          Ubah
        </Link>
        <button
          onClick={(e) => handleDelete(e)}
          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
