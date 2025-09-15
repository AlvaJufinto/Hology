"use client";

import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  ArrowLeft,
  Edit,
  TrendingUp,
  TrendingDown,
  DollarSign,
  MapPin,
  Activity,
  AlertTriangle,
  CheckCircle,
  Home,
} from "lucide-react";
import Layout from "../../components/shared/Layout";

const AssetsView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedPeriod, setSelectedPeriod] = useState("1Y");

  // Mock asset data
  const asset = {
    id: 1,
    name: "Downtown Apartment",
    type: "Real Estate",
    currentValue: 450000,
    purchaseValue: 380000,
    purchaseDate: "2022-03-15",
    location: "New York, NY",
    description:
      "Modern 2-bedroom apartment in downtown Manhattan with city views and premium amenities.",
    status: "Active",
    lastUpdated: "2024-01-15",
  };

  // Mock historical data for charts
  const historicalData = [
    { month: "Mar 2022", value: 380000, predicted: false },
    { month: "Jun 2022", value: 385000, predicted: false },
    { month: "Sep 2022", value: 390000, predicted: false },
    { month: "Dec 2022", value: 395000, predicted: false },
    { month: "Mar 2023", value: 405000, predicted: false },
    { month: "Jun 2023", value: 415000, predicted: false },
    { month: "Sep 2023", value: 425000, predicted: false },
    { month: "Dec 2023", value: 440000, predicted: false },
    { month: "Jan 2024", value: 450000, predicted: false },
    { month: "Apr 2024", value: 465000, predicted: true },
    { month: "Jul 2024", value: 480000, predicted: true },
    { month: "Oct 2024", value: 495000, predicted: true },
  ];

  const marketComparison = [
    { category: "Your Asset", value: 18.4, color: "#0d9488" },
    { category: "Local Market", value: 12.8, color: "#14b8a6" },
    { category: "National Average", value: 8.5, color: "#2dd4bf" },
  ];

  const valueChange = asset.currentValue - asset.purchaseValue;
  const valueChangePercent = (
    (valueChange / asset.purchaseValue) *
    100
  ).toFixed(1);
  const isPositive = valueChange >= 0;

  const aiInsights = [
    {
      type: "positive",
      title: "Strong Market Position",
      description: "Your asset is outperforming the local market by 5.6%",
      icon: CheckCircle,
      color: "green",
    },
    {
      type: "neutral",
      title: "Market Forecast",
      description: "Expected 8-12% growth over the next 12 months",
      icon: Activity,
      color: "blue",
    },
    {
      type: "warning",
      title: "Market Risk",
      description: "Interest rate changes may affect property values",
      icon: AlertTriangle,
      color: "yellow",
    },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/assets")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{asset.name}</h1>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-gray-600">{asset.type}</span>
                <span className="text-gray-400">•</span>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {asset.location}
                </div>
                <span className="text-gray-400">•</span>
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
            </div>
          </div>
          <Link
            to={`/assets/edit/${asset.id}`}
            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Asset
          </Link>
        </div>

        {/* Value Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Current Value
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${asset.currentValue.toLocaleString()}
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
                  Purchase Value
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${asset.purchaseValue.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Home className="h-6 w-6 text-blue-600" />
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
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isPositive ? "+" : ""}${valueChange.toLocaleString()}
                </p>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  isPositive ? "bg-green-50" : "bg-red-50"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-6 w-6 text-green-600" />
                ) : (
                  <TrendingDown className="h-6 w-6 text-red-600" />
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Return Rate</p>
                <p
                  className={`text-2xl font-bold ${
                    isPositive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {valueChangePercent}%
                </p>
              </div>
              <div
                className={`p-3 rounded-lg ${
                  isPositive ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            AI Market Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiInsights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`p-2 rounded-lg ${
                        insight.color === "green"
                          ? "bg-green-100"
                          : insight.color === "blue"
                          ? "bg-blue-100"
                          : "bg-yellow-100"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          insight.color === "green"
                            ? "text-green-600"
                            : insight.color === "blue"
                            ? "text-blue-600"
                            : "text-yellow-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {insight.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {insight.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Value Trend Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Value Trend & Forecast
              </h3>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="6M">6 Months</option>
                <option value="1Y">1 Year</option>
                <option value="2Y">2 Years</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  formatter={(value, name) => [
                    `$${value.toLocaleString()}`,
                    "Value",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0d9488"
                  strokeWidth={3}
                  dot={{ fill: "#0d9488", strokeWidth: 2, r: 4 }}
                  strokeDasharray={(entry) => (entry?.predicted ? "5 5" : "0")}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-teal-600 rounded-full mr-2"></div>
                Historical Data
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 border-2 border-teal-600 border-dashed rounded-full mr-2"></div>
                AI Forecast
              </div>
            </div>
          </div>

          {/* Market Comparison */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Performance vs Market
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={marketComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="category" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [`${value}%`, "Growth"]}
                />
                <Bar dataKey="value" fill="#0d9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Asset Information
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Asset Type</span>
                <span className="font-medium text-gray-900">{asset.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Purchase Date</span>
                <span className="font-medium text-gray-900">
                  {new Date(asset.purchaseDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location</span>
                <span className="font-medium text-gray-900">
                  {asset.location}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-medium text-gray-900">
                  {new Date(asset.lastUpdated).toLocaleDateString()}
                </span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <span className="text-gray-600">Description</span>
                <p className="mt-2 text-gray-900">{asset.description}</p>
              </div>
            </div>
          </div>

          {/* AI Forecasting */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              AI Forecasting
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-teal-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-teal-600" />
                  <span className="font-medium text-teal-900">
                    6-Month Forecast
                  </span>
                </div>
                <p className="text-2xl font-bold text-teal-900">$480,000</p>
                <p className="text-sm text-teal-700">+6.7% projected growth</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900">
                    12-Month Forecast
                  </span>
                </div>
                <p className="text-2xl font-bold text-blue-900">$495,000</p>
                <p className="text-sm text-blue-700">+10% projected growth</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Key Factors</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Local market demand increasing</li>
                  <li>• Infrastructure development nearby</li>
                  <li>• Interest rates stabilizing</li>
                  <li>• Property tax rates favorable</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AssetsView;
