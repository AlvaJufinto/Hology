/** @format */



import { useState } from "react";

import {
	Activity,
	Calendar,
	DollarSign,
	Download,
	Eye,
	FileText,
	Search,
	TrendingUp,
} from "lucide-react";

import Layout from "../../components/shared/Layout";

const Reports = () => {
	const [selectedType, setSelectedType] = useState("All");
	const [selectedPeriod, setSelectedPeriod] = useState("All");
	const [searchTerm, setSearchTerm] = useState("");

	const reports = [
		{
			id: 1,
			title: "Portfolio Performance Report",
			type: "Performance",
			period: "Q4 2023",
			generatedDate: "2024-01-15",
			status: "Ready",
			size: "2.4 MB",
			description:
				"Comprehensive analysis of portfolio performance including ROI, market comparison, and growth trends.",
		},
		{
			id: 2,
			title: "Asset Valuation Summary",
			type: "Valuation",
			period: "December 2023",
			generatedDate: "2024-01-10",
			status: "Ready",
			size: "1.8 MB",
			description:
				"Current market valuations for all assets with AI-powered forecasting and risk assessment.",
		},
		{
			id: 3,
			title: "Tax Preparation Report",
			type: "Tax",
			period: "2023",
			generatedDate: "2024-01-08",
			status: "Ready",
			size: "3.2 MB",
			description:
				"Complete tax documentation including capital gains, depreciation, and deductible expenses.",
		},
		{
			id: 4,
			title: "Risk Analysis Report",
			type: "Risk",
			period: "Q4 2023",
			generatedDate: "2024-01-05",
			status: "Ready",
			size: "1.5 MB",
			description:
				"Market risk assessment and portfolio diversification analysis with recommendations.",
		},
		{
			id: 5,
			title: "Monthly Asset Update",
			type: "Update",
			period: "January 2024",
			generatedDate: "2024-01-03",
			status: "Processing",
			size: "-",
			description:
				"Monthly summary of asset value changes, market trends, and AI insights.",
		},
		{
			id: 6,
			title: "Insurance Coverage Review",
			type: "Insurance",
			period: "2024",
			generatedDate: "2024-01-01",
			status: "Ready",
			size: "2.1 MB",
			description:
				"Analysis of current insurance coverage adequacy and recommendations for optimization.",
		},
	];

	const reportTypes = [
		"All",
		"Performance",
		"Valuation",
		"Tax",
		"Risk",
		"Update",
		"Insurance",
	];
	const periods = [
		"All",
		"Q4 2023",
		"December 2023",
		"2023",
		"January 2024",
		"2024",
	];

	const filteredReports = reports.filter((report) => {
		const matchesSearch =
			report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			report.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesType = selectedType === "All" || report.type === selectedType;
		const matchesPeriod =
			selectedPeriod === "All" || report.period === selectedPeriod;

		return matchesSearch && matchesType && matchesPeriod;
	});

	const generateReport = (type) => {
		// Simulate report generation
		console.log(`Generating ${type} report...`);
	};

	return (
		<Layout>
			<div className="p-6 space-y-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							AI Report Generation
						</h1>
						<p className="mt-2 text-gray-600">
							Generate and manage automated asset reports
						</p>
					</div>
					<div className="mt-4 sm:mt-0 flex space-x-3">
						<button
							onClick={() => generateReport("Custom")}
							className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
						>
							Generate New Report
						</button>
					</div>
				</div>

				{/* Quick Generate Cards */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					<div
						onClick={() => generateReport("Performance")}
						className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
					>
						<div className="flex items-center space-x-4">
							<div className="p-3 bg-teal-50 rounded-lg">
								<TrendingUp className="h-6 w-6 text-teal-600" />
							</div>
							<div>
								<h3 className="font-semibold text-gray-900">Performance</h3>
								<p className="text-sm text-gray-600">Portfolio analysis</p>
							</div>
						</div>
					</div>

					<div
						onClick={() => generateReport("Valuation")}
						className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
					>
						<div className="flex items-center space-x-4">
							<div className="p-3 bg-blue-50 rounded-lg">
								<DollarSign className="h-6 w-6 text-blue-600" />
							</div>
							<div>
								<h3 className="font-semibold text-gray-900">Valuation</h3>
								<p className="text-sm text-gray-600">Current values</p>
							</div>
						</div>
					</div>

					<div
						onClick={() => generateReport("Tax")}
						className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
					>
						<div className="flex items-center space-x-4">
							<div className="p-3 bg-green-50 rounded-lg">
								<FileText className="h-6 w-6 text-green-600" />
							</div>
							<div>
								<h3 className="font-semibold text-gray-900">Tax Report</h3>
								<p className="text-sm text-gray-600">Tax documentation</p>
							</div>
						</div>
					</div>

					<div
						onClick={() => generateReport("Risk")}
						className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
					>
						<div className="flex items-center space-x-4">
							<div className="p-3 bg-purple-50 rounded-lg">
								<Activity className="h-6 w-6 text-purple-600" />
							</div>
							<div>
								<h3 className="font-semibold text-gray-900">Risk Analysis</h3>
								<p className="text-sm text-gray-600">Risk assessment</p>
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
								placeholder="Search reports..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
							/>
						</div>

						{/* Type Filter */}
						<select
							value={selectedType}
							onChange={(e) => setSelectedType(e.target.value)}
							className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
						>
							{reportTypes.map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>

						{/* Period Filter */}
						<select
							value={selectedPeriod}
							onChange={(e) => setSelectedPeriod(e.target.value)}
							className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
						>
							{periods.map((period) => (
								<option key={period} value={period}>
									{period}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* Reports List */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200">
					<div className="p-6 border-b border-gray-200">
						<h2 className="text-lg font-semibold text-gray-900">
							Generated Reports
						</h2>
						<p className="text-sm text-gray-600 mt-1">
							Showing {filteredReports.length} of {reports.length} reports
						</p>
					</div>

					<div className="divide-y divide-gray-200">
						{filteredReports.map((report) => (
							<div
								key={report.id}
								className="p-6 hover:bg-gray-50 transition-colors"
							>
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<div className="flex items-center space-x-3 mb-2">
											<h3 className="text-lg font-medium text-gray-900">
												{report.title}
											</h3>
											<span
												className={`px-2 py-1 rounded-full text-xs font-medium ${
													report.status === "Ready"
														? "bg-green-100 text-green-700"
														: "bg-yellow-100 text-yellow-700"
												}`}
											>
												{report.status}
											</span>
										</div>

										<p className="text-gray-600 mb-3">{report.description}</p>

										<div className="flex items-center space-x-6 text-sm text-gray-500">
											<div className="flex items-center">
												<FileText className="h-4 w-4 mr-1" />
												{report.type}
											</div>
											<div className="flex items-center">
												<Calendar className="h-4 w-4 mr-1" />
												{report.period}
											</div>
											<div>
												Generated:{" "}
												{new Date(report.generatedDate).toLocaleDateString()}
											</div>
											{report.size !== "-" && <div>Size: {report.size}</div>}
										</div>
									</div>

									<div className="flex items-center space-x-2 ml-4">
										{report.status === "Ready" && (
											<>
												<button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
													<Eye className="h-4 w-4 mr-2" />
													View
												</button>
												<button className="flex items-center px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
													<Download className="h-4 w-4 mr-2" />
													Download
												</button>
											</>
										)}
										{report.status === "Processing" && (
											<div className="flex items-center px-3 py-2 text-yellow-600">
												<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
												Processing...
											</div>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* No Results */}
				{filteredReports.length === 0 && (
					<div className="text-center py-12">
						<FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							No reports found
						</h3>
						<p className="text-gray-600">
							Try adjusting your search criteria or generate a new report
						</p>
					</div>
				)}

				{/* AI Report Generation Info */}
				<div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200 p-6">
					<div className="flex items-start space-x-4">
						<div className="p-3 bg-teal-100 rounded-lg">
							<Activity className="h-6 w-6 text-teal-600" />
						</div>
						<div className="flex-1">
							<h3 className="text-lg font-semibold text-gray-900 mb-2">
								AI-Powered Report Generation
							</h3>
							<p className="text-gray-700 mb-3">
								Our AI automatically analyzes your portfolio data to generate
								comprehensive reports with:
							</p>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
								<ul className="space-y-1">
									<li>• Market trend analysis</li>
									<li>• Performance benchmarking</li>
									<li>• Risk assessment</li>
								</ul>
								<ul className="space-y-1">
									<li>• Tax optimization insights</li>
									<li>• Future value projections</li>
									<li>• Actionable recommendations</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Reports;
