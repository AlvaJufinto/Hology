"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Home,
  Car,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
  DollarSign,
} from "lucide-react";
import Layout from "./Layout";

const Assets = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const assets = [
    {
      id: 1,
      name: "Downtown Apartment",
      type: "Real Estate",
      currentValue: 450000,
      purchaseValue: 380000,
      change: 18.4,
      trend: "up",
      status: "Active",
      lastUpdated: "2024-01-15",
      location: "New York, NY",
      icon: Home,
    },
    {
      id: 2,
      name: "2023 Tesla Model S",
      type: "Vehicle",
      currentValue: 85000,
      purchaseValue: 95000,
      change: -10.5,
      trend: "down",
      status: "Active",
      lastUpdated: "2024-01-14",
      location: "Los Angeles, CA",
      icon: Car,
    },
    {
      id: 3,
      name: "Tech Stock Portfolio",
      type: "Investment",
      currentValue: 125000,
      purchaseValue: 100000,
      change: 25.0,
      trend: "up",
      status: "Active",
      lastUpdated: "2024-01-15",
      location: "Portfolio",
      icon: TrendingUp,
    },
    {
      id: 4,
      name: "Suburban House",
      type: "Real Estate",
      currentValue: 320000,
      purchaseValue: 285000,
      change: 12.3,
      trend: "up",
      status: "Active",
      lastUpdated: "2024-01-13",
      location: "Austin, TX",
      icon: Home,
    },
    {
      id: 5,
      name: "2022 BMW X5",
      type: "Vehicle",
      currentValue: 62000,
      purchaseValue: 75000,
      change: -17.3,
      trend: "down",
      status: "Active",
      lastUpdated: "2024-01-12",
      location: "Chicago, IL",
      icon: Car,
    },
    {
      id: 6,
      name: "Bond Investment",
      type: "Investment",
      currentValue: 75000,
      purchaseValue: 70000,
      change: 7.1,
      trend: "up",
      status: "Active",
      lastUpdated: "2024-01-15",
      location: "Portfolio",
      icon: DollarSign,
    },
  ];

  const assetTypes = ["All", "Real Estate", "Vehicle", "Investment"];
  const statusOptions = ["All", "Active", "Inactive", "Pending"];

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || asset.type === typeFilter;
    const matchesStatus =
      statusFilter === "All" || asset.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const totalValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
  const totalGain = assets.reduce(
    (sum, asset) => sum + (asset.currentValue - asset.purchaseValue),
    0
  );
  const totalGainPercent = (
    (totalGain / assets.reduce((sum, asset) => sum + asset.purchaseValue, 0)) *
    100
  ).toFixed(1);

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Asset Management
            </h1>
            <p className="mt-2 text-gray-600">
              Track and manage your investment portfolio
            </p>
          </div>
          <Link
            to="/assets/create"
            className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Asset
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Portfolio Value
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalValue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-teal-50 rounded-lg">
                <DollarSign className="h-6 w-6 text-teal-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Assets
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {assets.length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Gain/Loss
                </p>
                <p
                  className={`text-2xl font-bold ${
                    totalGain >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {totalGain >= 0 ? "+" : ""}${totalGain.toLocaleString()}
                </p>
                <p
                  className={`text-sm ${
                    totalGain >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {totalGain >= 0 ? "+" : ""}
                  {totalGainPercent}%
                </p>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  totalGain >= 0 ? "bg-green-50" : "bg-red-50"
                }`}
              >
                {totalGain >= 0 ? (
                  <TrendingUp className="h-6 w-6 text-green-600" />
                ) : (
                  <TrendingDown className="h-6 w-6 text-red-600" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {assetTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => {
            const Icon = asset.icon;
            const changePercent = (
              ((asset.currentValue - asset.purchaseValue) /
                asset.purchaseValue) *
              100
            ).toFixed(1);

            return (
              <div
                key={asset.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-teal-50 rounded-lg">
                      <Icon className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {asset.name}
                      </h3>
                      <p className="text-sm text-gray-500">{asset.type}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      asset.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {asset.status}
                  </span>
                </div>

                {/* Value Information */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Value</span>
                    <span className="font-semibold text-gray-900">
                      ${asset.currentValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Purchase Value
                    </span>
                    <span className="text-sm text-gray-500">
                      ${asset.purchaseValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Change</span>
                    <div className="flex items-center space-x-1">
                      {asset.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          asset.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {asset.trend === "up" ? "+" : ""}
                        {changePercent}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Location and Last Updated */}
                <div className="text-xs text-gray-500 mb-4">
                  <p>{asset.location}</p>
                  <p>
                    Updated: {new Date(asset.lastUpdated).toLocaleDateString()}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Link
                    to={`/assets/view/${asset.id}`}
                    className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Link>
                  <Link
                    to={`/assets/edit/${asset.id}`}
                    className="flex-1 flex items-center justify-center px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                  <button className="flex items-center justify-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredAssets.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No assets found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or add a new asset
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Assets;
