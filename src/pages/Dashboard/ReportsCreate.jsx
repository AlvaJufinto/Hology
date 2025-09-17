/** @format */

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	FileText,
	TrendingUp,
	Activity,
	ArrowLeft,
	Download,
	Eye,
	Settings,
	CheckCircle,
	ClipboardList,
	Shield,
	Calculator,
	RefreshCcw,
	BarChart3,
	FolderOpen,
} from "lucide-react";

import Layout from "../../components/shared/Layout";
import { REPORT_TYPE, toOptions, getLabel, formatIndoDate } from "../../utils"; // <- pastikan alias/relatif sesuai strukturmu

// Opsi report berbasis utils
const REPORT_OPTIONS = toOptions(REPORT_TYPE);

// Map key REPORT_TYPE -> ikon
const REPORT_ICON_MAP = {
	semua: FolderOpen,
	kinerja: BarChart3,
	penilaian: ClipboardList,
	pajak: Calculator,
	risiko: Shield,
	pembaruan: RefreshCcw,
	asuransi: FileText,
};

// Palet warna stabil (hindari kelas Tailwind dinamis)
const TYPE_COLOR = {
	kinerja: {
		borderActive: "border-teal-500",
		bgActive: "bg-teal-50",
		textIconActive: "text-teal-600",
		textActive: "text-teal-700",
	},
	penilaian: {
		borderActive: "border-blue-500",
		bgActive: "bg-blue-50",
		textIconActive: "text-blue-600",
		textActive: "text-blue-700",
	},
	pajak: {
		borderActive: "border-green-500",
		bgActive: "bg-green-50",
		textIconActive: "text-green-600",
		textActive: "text-green-700",
	},
	risiko: {
		borderActive: "border-purple-500",
		bgActive: "bg-purple-50",
		textIconActive: "text-purple-600",
		textActive: "text-purple-700",
	},
	pembaruan: {
		borderActive: "border-amber-500",
		bgActive: "bg-amber-50",
		textIconActive: "text-amber-600",
		textActive: "text-amber-700",
	},
	asuransi: {
		borderActive: "border-indigo-500",
		bgActive: "bg-indigo-50",
		textIconActive: "text-indigo-600",
		textActive: "text-indigo-700",
	},
	semua: {
		borderActive: "border-gray-500",
		bgActive: "bg-gray-50",
		textIconActive: "text-gray-600",
		textActive: "text-gray-700",
	},
};

function getTypeClasses(selectedKey, thisKey) {
	const palette = TYPE_COLOR[thisKey] || TYPE_COLOR.semuа;
	const base =
		"flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors";
	return selectedKey === thisKey
		? `${base} ${palette.borderActive} ${palette.bgActive}`
		: `${base} border-gray-200 hover:border-gray-300`;
}

function getIconClasses(selectedKey, thisKey) {
	const palette = TYPE_COLOR[thisKey] || TYPE_COLOR.semuа;
	return selectedKey === thisKey
		? `${palette.textIconActive}`
		: "text-gray-400";
}

function getTextClasses(selectedKey, thisKey) {
	const palette = TYPE_COLOR[thisKey] || TYPE_COLOR.semuа;
	return selectedKey === thisKey
		? `text-sm font-medium ${palette.textActive}`
		: "text-sm font-medium text-gray-700";
}

const ReportsCreate = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: "",
		type: "kinerja",
		startDate: "",
		endDate: "",
		includeCharts: true,
		includeForecasting: true,
		includeComparison: false,
		format: "PDF",
		description: "",
	});
	const [showPreview, setShowPreview] = useState(false);

	const isInvalidDateRange = useMemo(() => {
		if (!formData.startDate || !formData.endDate) return false;
		return new Date(formData.endDate) < new Date(formData.startDate);
	}, [formData.startDate, formData.endDate]);

	const isPreviewEnabled = useMemo(() => {
		return (
			!!formData.title &&
			!!formData.startDate &&
			!!formData.endDate &&
			!isInvalidDateRange
		);
	}, [formData, isInvalidDateRange]);

	const isSubmitDisabled = !isPreviewEnabled;

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (isSubmitDisabled) return;
		console.log("[ReportsCreate] Generating report with:", formData);
		navigate("/reports");
	};

	const generatePreview = () => setShowPreview(true);

	// Sembunyikan "semua" di pemilihan tipe
	const selectableReportTypes = useMemo(
		() => REPORT_OPTIONS.filter((opt) => opt.value !== "semua"),
		[]
	);

	const minEndDate = formData.startDate || undefined;

	return (
		<Layout>
			<div className="p-6 max-w-4xl mx-auto space-y-6">
				{/* Header */}
				<div className="flex items-center space-x-4">
					<button
						onClick={() => navigate("/reports")}
						className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						type="button"
						aria-label="Back"
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
					{/* Form */}
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
											{selectableReportTypes.map((typeOpt) => {
												const key = typeOpt.value;
												const Icon = REPORT_ICON_MAP[key] || FileText;
												return (
													<label
														key={key}
														className={getTypeClasses(formData.type, key)}
													>
														<input
															type="radio"
															name="type"
															value={key}
															checked={formData.type === key}
															onChange={handleInputChange}
															className="sr-only"
														/>
														<Icon
															className={`h-5 w-5 mr-2 ${getIconClasses(
																formData.type,
																key
															)}`}
														/>
														<span
															className={getTextClasses(formData.type, key)}
														>
															{typeOpt.label}
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
											min={minEndDate}
											onChange={handleInputChange}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
											required
										/>
										{isInvalidDateRange && (
											<p className="text-xs text-red-600 mt-1">
												End Date must be on or after Start Date.
											</p>
										)}
									</div>
								</div>
							</div>

							{/* Options */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
								<h2 className="text-lg font-semibold text-gray-900 mb-4">
									Report Options
								</h2>

								<div className="space-y-4">
									<ToggleRow
										title="Include Charts & Graphs"
										subtitle="Visual representations of data trends"
										name="includeCharts"
										checked={formData.includeCharts}
										onChange={handleInputChange}
									/>
									<ToggleRow
										title="AI Forecasting"
										subtitle="Future value predictions and trends"
										name="includeForecasting"
										checked={formData.includeForecasting}
										onChange={handleInputChange}
									/>
									<ToggleRow
										title="Market Comparison"
										subtitle="Compare against market benchmarks"
										name="includeComparison"
										checked={formData.includeComparison}
										onChange={handleInputChange}
									/>

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

							{/* Actions */}
							<div className="flex space-x-4">
								<button
									type="button"
									onClick={generatePreview}
									disabled={!isPreviewEnabled}
									className="flex-1 flex items-center justify-center px-4 py-3 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors disabled:border-gray-300 disabled:text-gray-400 disabled:hover:bg-transparent"
								>
									<Eye className="h-4 w-4 mr-2" />
									Preview Report
								</button>
								<button
									type="submit"
									disabled={isSubmitDisabled}
									className="flex-1 flex items-center justify-center px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
								>
									<FileText className="h-4 w-4 mr-2" />
									Generate Report
								</button>
							</div>
						</form>
					</div>

					{/* Preview */}
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
									disabled={!isPreviewEnabled}
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

function ToggleRow({ title, subtitle, name, checked, onChange }) {
	return (
		<div className="flex items-center justify-between">
			<div>
				<label className="text-sm font-medium text-gray-700">{title}</label>
				<p className="text-xs text-gray-500">{subtitle}</p>
			</div>
			<input
				type="checkbox"
				name={name}
				checked={checked}
				onChange={onChange}
				className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
			/>
		</div>
	);
}

const ReportPreview = ({ formData }) => {
	const today = formatIndoDate(new Date().toISOString());
	const labelType = getLabel(REPORT_TYPE, formData.type);

	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
			<div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
				<h3 className="font-medium text-gray-900">Report Preview</h3>
				<div className="flex space-x-2">
					<button
						type="button"
						className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
						aria-label="Download"
					>
						<Download className="h-4 w-4" />
					</button>
					<button
						type="button"
						className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
						aria-label="Settings"
					>
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
						{labelType} • {formData.startDate} s/d {formData.endDate}
					</p>
					<p className="text-sm text-gray-500 mt-1">Dibuat {today}</p>
				</div>

				{/* Executive Summary */}
				<div>
					<h2 className="text-lg font-semibold text-gray-900 mb-3">
						Executive Summary
					</h2>
					<div className="bg-gray-50 p-4 rounded-lg">
						<p className="text-sm text-gray-700 mb-2">
							Laporan {labelType.toLowerCase()} ini menganalisis portofolio Anda
							dari {formData.startDate} hingga {formData.endDate}.
						</p>
						{formData.description && (
							<p className="text-sm text-gray-600 italic">
								"{formData.description}"
							</p>
						)}
					</div>
				</div>

				{/* Key Metrics (mock) */}
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
							<div className="text-2xl font-bold text-blue-600">
								Rp 2.400.000.000
							</div>
							<div className="text-sm text-blue-700">Nilai Portofolio</div>
						</div>
					</div>
				</div>

				{/* Charts */}
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

				{/* Forecasting */}
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
								Berdasarkan tren saat ini, portofolio diproyeksi tumbuh 8–15%
								dalam 12 bulan ke depan.
							</p>
						</div>
					</div>
				)}

				{/* Comparison */}
				{formData.includeComparison && (
					<div>
						<h2 className="text-lg font-semibold text-gray-900 mb-3">
							Market Comparison
						</h2>
						<div className="space-y-2">
							<RowComparison label="Your Portfolio" value="+12.5%" strong />
							<RowComparison label="S&P 500" value="+8.2%" />
							<RowComparison label="Market Average" value="+6.8%" />
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

function RowComparison({ label, value, strong = false }) {
	return (
		<div className="flex justify-between items-center p-2 bg-gray-50 rounded">
			<span className="text-sm text-gray-700">{label}</span>
			<span
				className={`font-medium ${strong ? "text-green-600" : "text-gray-600"}`}
			>
				{value}
			</span>
		</div>
	);
}

export default ReportsCreate;
