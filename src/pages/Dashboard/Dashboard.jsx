import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Shield,
  FileText,
  Users,
  DollarSign,
  Activity,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import Layout from "./Layout";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("6M");

  // Sample data for charts
  const assetTrendData = [
    { month: "Jan", value: 85000, predicted: false },
    { month: "Feb", value: 87500, predicted: false },
    { month: "Mar", value: 89200, predicted: false },
    { month: "Apr", value: 91800, predicted: false },
    { month: "May", value: 94500, predicted: false },
    { month: "Jun", value: 97200, predicted: false },
    { month: "Jul", value: 99800, predicted: true },
    { month: "Aug", value: 102500, predicted: true },
    { month: "Sep", value: 105200, predicted: true },
  ];

  const portfolioData = [
    { name: "Real Estate", value: 450000, color: "#0d9488" },
    { name: "Vehicles", value: 85000, color: "#14b8a6" },
    { name: "Stocks", value: 125000, color: "#2dd4bf" },
    { name: "Bonds", value: 75000, color: "#5eead4" },
  ];

  const assetPerformance = [
    { name: "Property A", current: 250000, change: 12.5, trend: "up" },
    { name: "Vehicle B", current: 45000, change: -3.2, trend: "down" },
    { name: "Stock Portfolio", current: 125000, change: 8.7, trend: "up" },
    { name: "Bond Fund", current: 75000, change: 2.1, trend: "up" },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              AI Asset Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Manage and track your assets with AI-powered insights
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
              Generate Report
            </button>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="1M">1 Month</option>
              <option value="3M">3 Months</option>
              <option value="6M">6 Months</option>
              <option value="1Y">1 Year</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Portfolio Value
                </p>
                <p className="text-2xl font-bold text-gray-900">$735,000</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-4 w-4 mr-1" />
                  +12.5% from last month
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
                  Active Assets
                </p>
                <p className="text-2xl font-bold text-gray-900">24</p>
                <p className="text-sm text-blue-600 flex items-center mt-1">
                  <Activity className="h-4 w-4 mr-1" />3 new this month
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
                  AI Predictions
                </p>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-sm text-purple-600 flex items-center mt-1">
                  <FileText className="h-4 w-4 mr-1" />
                  Updated today
                </p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Security Score
                </p>
                <p className="text-2xl font-bold text-gray-900">98%</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <Shield className="h-4 w-4 mr-1" />
                  Fully secured
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights Card */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200 p-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-teal-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                AI Market Insight
              </h3>
              <p className="text-gray-700 mb-3">
                Your real estate portfolio is predicted to increase by{" "}
                <span className="font-semibold text-teal-600">
                  12% over the next 6 months
                </span>{" "}
                based on current market trends and location analysis.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">
                  High Growth Potential
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Market Favorable
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                  Low Risk
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Asset Valuation Trend */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Asset Valuation & Forecast
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-teal-600 rounded-full mr-2"></div>
                  Actual
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-teal-300 rounded-full mr-2"></div>
                  Predicted
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={assetTrendData}>
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
          </div>

          {/* Portfolio Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Portfolio Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, "Value"]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {portfolioData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Asset Performance Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Asset Performance
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Asset
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Current Value
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Change
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody>
                {assetPerformance.map((asset, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4 font-medium text-gray-900">
                      {asset.name}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      ${asset.current.toLocaleString()}
                    </td>
                    <td
                      className={`py-4 px-4 font-medium ${
                        asset.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {asset.trend === "up" ? "+" : ""}
                      {asset.change}%
                    </td>
                    <td className="py-4 px-4">
                      {asset.trend === "up" ? (
                        <ArrowUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-600" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-teal-50 rounded-lg">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Find Notary</h4>
                <p className="text-sm text-gray-600">
                  Connect with verified professionals
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Generate Report</h4>
                <p className="text-sm text-gray-600">
                  AI-powered asset analysis
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Security Status</h4>
                <p className="text-sm text-gray-600">
                  Digital ledger protection
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
