"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  TrendingUp,
  DollarSign,
  Activity,
  ArrowLeft,
  Download,
  Eye,
  Settings,
  CheckCircle,
} from "lucide-react";
import Layout from "../../components/shared/Layout";

const ReportCreate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    type: "Performance",
    startDate: "",
    endDate: "",
    includeCharts: true,
    includeForecasting: true,
    includeComparison: false,
    format: "PDF",
    description: "",
  });
  const [showPreview, setShowPreview] = useState(false);

  const reportTypes = [
    {
      value: "Performance",
      label: "Portfolio Performance",
      icon: TrendingUp,
      color: "teal",
    },
    {
      value: "Valuation",
      label: "Asset Valuation",
      icon: DollarSign,
      color: "blue",
    },
    { value: "Tax", label: "Tax Report", icon: FileText, color: "green" },
    { value: "Risk", label: "Risk Analysis", icon: Activity, color: "purple" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("[v0] Generating report with data:", formData);
    // Simulate report generation
    setTimeout(() => {
      navigate("/reports");
    }, 2000);
  };

  const generatePreview = () => {
    setShowPreview(true);
  };

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/reports")}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Create Custom Report
            </h1>
            <p className="mt-2 text-gray-600">
              Generate a personalized AI-powered asset report
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Basic Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Report Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter report title..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Report Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {reportTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <label
                            key={type.value}
                            className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.type === type.value
                                ? `border-${type.color}-500 bg-${type.color}-50`
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="type"
                              value={type.value}
                              checked={formData.type === type.value}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <Icon
                              className={`h-5 w-5 mr-2 ${
                                formData.type === type.value
                                  ? `text-${type.color}-600`
                                  : "text-gray-400"
                              }`}
                            />
                            <span
                              className={`text-sm font-medium ${
                                formData.type === type.value
                                  ? `text-${type.color}-700`
                                  : "text-gray-700"
                              }`}
                            >
                              {type.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description (Optional)
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Add any specific requirements or notes..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Date Range */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Date Range
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Report Options */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Report Options
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Include Charts & Graphs
                      </label>
                      <p className="text-xs text-gray-500">
                        Visual representations of data trends
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      name="includeCharts"
                      checked={formData.includeCharts}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        AI Forecasting
                      </label>
                      <p className="text-xs text-gray-500">
                        Future value predictions and trends
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      name="includeForecasting"
                      checked={formData.includeForecasting}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Market Comparison
                      </label>
                      <p className="text-xs text-gray-500">
                        Compare against market benchmarks
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      name="includeComparison"
                      checked={formData.includeComparison}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Output Format
                    </label>
                    <select
                      name="format"
                      value={formData.format}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="PDF">PDF Document</option>
                      <option value="Excel">Excel Spreadsheet</option>
                      <option value="PowerPoint">
                        PowerPoint Presentation
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={generatePreview}
                  className="flex-1 flex items-center justify-center px-4 py-3 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Report
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </button>
              </div>
            </form>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            {showPreview ? (
              <ReportPreview formData={formData} />
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Report Preview
                </h3>
                <p className="text-gray-600 mb-4">
                  Fill out the form and click "Preview Report" to see how your
                  report will look
                </p>
                <button
                  onClick={generatePreview}
                  disabled={
                    !formData.title || !formData.startDate || !formData.endDate
                  }
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Generate Preview
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

const ReportPreview = ({ formData }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <h3 className="font-medium text-gray-900">Report Preview</h3>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
            <Download className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* PDF Mockup */}
      <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="text-center border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {formData.title || "Custom Report"}
          </h1>
          <p className="text-gray-600">
            {formData.type} Report • {formData.startDate} to {formData.endDate}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Generated on {currentDate}
          </p>
        </div>

        {/* Executive Summary */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Executive Summary
          </h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">
              This {formData.type.toLowerCase()} report provides comprehensive
              analysis of your portfolio from {formData.startDate} to{" "}
              {formData.endDate}.
            </p>
            {formData.description && (
              <p className="text-sm text-gray-600 italic">
                "{formData.description}"
              </p>
            )}
          </div>
        </div>

        {/* Key Metrics */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Key Metrics
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-teal-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-teal-600">+12.5%</div>
              <div className="text-sm text-teal-700">Total Return</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">$2.4M</div>
              <div className="text-sm text-blue-700">Portfolio Value</div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        {formData.includeCharts && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Performance Charts
            </h2>
            <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">
                  Chart visualization will appear here
                </p>
              </div>
            </div>
          </div>
        )}

        {/* AI Forecasting */}
        {formData.includeForecasting && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              AI Forecasting
            </h2>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Activity className="h-5 w-5 text-purple-600 mr-2" />
                <span className="font-medium text-purple-700">
                  12-Month Projection
                </span>
              </div>
              <p className="text-sm text-gray-700">
                Based on current trends and market analysis, your portfolio is
                projected to grow by 8-15% over the next 12 months.
              </p>
            </div>
          </div>
        )}

        {/* Market Comparison */}
        {formData.includeComparison && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Market Comparison
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">Your Portfolio</span>
                <span className="font-medium text-green-600">+12.5%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">S&P 500</span>
                <span className="font-medium text-gray-600">+8.2%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">Market Average</span>
                <span className="font-medium text-gray-600">+6.8%</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-200 pt-4 text-center">
          <p className="text-xs text-gray-500">
            This report was generated using AI-powered analysis • AI Assets
            Dashboard
          </p>
          <div className="flex items-center justify-center mt-2">
            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
            <span className="text-xs text-green-600">Verified & Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCreate;
