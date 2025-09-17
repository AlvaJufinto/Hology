/** @format */

import { useMemo, useState } from "react";

import { Eye, Loader, TrendingUp } from "lucide-react";

import { generateReport } from "../../services/reports";
import { REPORT_TYPE, toOptions } from "../../utils";

export default function NewReportModal({ open, onClose, setLoading, uid }) {
	const [submitting, setSubmitting] = useState(false);

	const [formData, setFormData] = useState({
		title: "",
		type: "kinerja",
		//startDate: "",
		//endDate: "",
		includeCharts: true,
		includeForecasting: true,
		includeComparison: false,
		description: "",
	});

	const selectableReportTypes = useMemo(
		() => toOptions(REPORT_TYPE).filter((opt) => opt.value !== "semua"),
		[]
	);

	const isInvalidDateRange = useMemo(() => {
		if (!formData.startDate || !formData.endDate) return false;
		return new Date(formData.endDate) < new Date(formData.startDate);
	}, [formData.startDate, formData.endDate]);

	const isFormValid = !!formData.title && !!uid;

	const minEndDate = formData.startDate || undefined;

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!isFormValid) return;

		setSubmitting(true);
		setLoading?.(true);

		try {
			await generateReport(uid, setLoading, formData);
			onClose?.();
			console.log(formData);
			// optional reset title/desc
			setFormData((p) => ({ ...p, title: "", description: "" }));
		} finally {
			setSubmitting(false);
			setLoading?.(false);
		}
	};

	if (!open) return null;

	const stop = (e) => e.stopPropagation();

	return (
		<div
			onClick={onClose}
			className="fixed inset-0 bg-black/30 flex justify-center items-center z-50"
			role="dialog"
			aria-modal="true"
		>
			<div
				onClick={stop}
				className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-lg"
			>
				<div className="flex items-start justify-between mb-4">
					<h2 className="text-2xl font-semibold">Buat Laporan Baru</h2>
					<button
						onClick={onClose}
						className="px-2 py-1 rounded-lg hover:bg-gray-100 text-gray-600"
						aria-label="Tutup"
					>
						✕
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					{/* Basic Information */}
					<section className="space-y-4">
						<div>
							<label
								htmlFor="title"
								className="block text-sm font-medium text-gray-700"
							>
								Judul Laporan *
							</label>
							<input
								id="title"
								name="title"
								type="text"
								value={formData.title}
								onChange={handleChange}
								required
								placeholder="Contoh: Laporan Kinerja Q3 2025"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Jenis Laporan *
							</label>
							<div className="grid grid-cols-2 gap-3">
								{selectableReportTypes.map((opt) => (
									<label
										key={opt.value}
										className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
											formData.type === opt.value
												? "border-teal-500 bg-teal-50"
												: "border-gray-200 hover:border-gray-300"
										}`}
									>
										<input
											type="radio"
											name="type"
											value={opt.value}
											className="sr-only"
											checked={formData.type === opt.value}
											onChange={handleChange}
										/>
										<TrendingUp
											className={`h-5 w-5 mr-2 ${
												formData.type === opt.value
													? "text-teal-600"
													: "text-gray-400"
											}`}
										/>
										<span
											className={`text-sm font-medium ${
												formData.type === opt.value
													? "text-teal-700"
													: "text-gray-700"
											}`}
										>
											{opt.label}
										</span>
									</label>
								))}
							</div>
						</div>

						<div>
							<label
								htmlFor="description"
								className="block text-sm font-medium text-gray-700"
							>
								Catatan Tambahan (opsional)
							</label>
							<textarea
								id="description"
								name="description"
								rows={3}
								value={formData.description}
								onChange={handleChange}
								placeholder='Tambahkan catatan, mis. "Fokus pada aset properti"'
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
							/>
						</div>
					</section>

					{/*<section className="space-y-3">
						<h3 className="text-sm font-semibold text-gray-900">
							Rentang Tanggal
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor="startDate"
									className="block text-sm font-medium text-gray-700"
								>
									Start Date *
								</label>
								<input
									id="startDate"
									name="startDate"
									type="date"
									value={formData.startDate}
									onChange={handleChange}
									required
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
								/>
							</div>
							<div>
								<label
									htmlFor="endDate"
									className="block text-sm font-medium text-gray-700"
								>
									End Date *
								</label>
								<input
									id="endDate"
									name="endDate"
									type="date"
									value={formData.endDate}
									min={minEndDate}
									onChange={handleChange}
									required
									className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
								/>
								{isInvalidDateRange && (
									<p className="text-xs text-red-600 mt-1">
										End Date harus ≥ Start Date.
									</p>
								)}
							</div>
						</div>
					</section>*/}

					{/* Options */}
					<section className="space-y-4">
						<h3 className="text-sm font-semibold text-gray-900">
							Opsi Laporan
						</h3>

						<ToggleRow
							title="Include Charts & Graphs"
							subtitle="Visualisasi tren data"
							name="includeCharts"
							checked={formData.includeCharts}
							onChange={handleChange}
						/>
						<ToggleRow
							title="AI Forecasting"
							subtitle="Prediksi nilai & tren ke depan"
							name="includeForecasting"
							checked={formData.includeForecasting}
							onChange={handleChange}
						/>
						<ToggleRow
							title="Market Comparison"
							subtitle="Bandingkan dengan benchmark pasar"
							name="includeComparison"
							checked={formData.includeComparison}
							onChange={handleChange}
						/>

						{/*<div>
							<label
								htmlFor="format"
								className="block text-sm font-medium text-gray-700"
							>
								Output Format
							</label>
							<select
								id="format"
								name="format"
								value={formData.format}
								onChange={handleChange}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
							>
								<option value="PDF">PDF Document</option>
								<option value="Excel">Excel Spreadsheet</option>
								<option value="PowerPoint">PowerPoint Presentation</option>
							</select>
						</div>*/}
					</section>

					{/* Actions */}
					<div className="flex justify-end gap-3 pt-2">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
						>
							Tutup
						</button>
						<button
							type="submit"
							disabled={!isFormValid || submitting}
							className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed inline-flex items-center gap-2"
						>
							{submitting ? (
								<Loader className="animate-spin" size={18} />
							) : (
								<Eye size={18} />
							)}
							Simpan Laporan
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

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
