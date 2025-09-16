/** @format */

import { useState } from "react";

import {
	Activity,
	DollarSign,
	FileText,
	Search,
	TrendingUp,
} from "lucide-react";

import BannerAI from "../../components/Reports/BannerAI";
import NewReportButton from "../../components/Reports/NewReportButton";
import ReportCard from "../../components/Reports/ReportCard";
import Layout from "../../components/shared/Layout";
import { REPORT_TYPE } from "../../utils";

const Reports = () => {
	const [selectedType, setSelectedType] = useState("Semua");
	const [selectedPeriod, setSelectedPeriod] = useState("Semua");
	const [searchTerm, setSearchTerm] = useState("");

	const reports = [
		{
			id: 1,
			title: "Laporan Kinerja Portofolio",
			type: "Kinerja",
			period: "Triwulan IV 2023",
			generatedDate: "2024-01-15",
			status: "Siap",
			size: "2,4 MB",
			description:
				"Analisis komprehensif kinerja portofolio: ROI, perbandingan dengan pasar, dan tren pertumbuhan.",
		},
		{
			id: 2,
			title: "Ringkasan Penilaian Aset",
			type: "Penilaian",
			period: "Desember 2023",
			generatedDate: "2024-01-10",
			status: "Siap",
			size: "1,8 MB",
			description:
				"Nilai pasar terbaru untuk seluruh aset dilengkapi proyeksi dan penilaian risiko berbasis AI.",
		},
		{
			id: 3,
			title: "Laporan Persiapan Pajak",
			type: "Pajak",
			period: "Tahun Buku 2023",
			generatedDate: "2024-01-08",
			status: "Siap",
			size: "3,2 MB",
			description:
				"Dokumentasi pajak: capital gain, depresiasi, dan biaya yang dapat dikurangkan.",
		},
		{
			id: 4,
			title: "Analisis Risiko Portofolio",
			type: "Risiko",
			period: "Triwulan IV 2023",
			generatedDate: "2024-01-05",
			status: "Siap",
			size: "1,5 MB",
			description:
				"Penilaian risiko pasar dan diversifikasi portofolio disertai rekomendasi.",
		},
		{
			id: 5,
			title: "Pembaruan Aset Bulanan",
			type: "Pembaruan",
			period: "Januari 2024",
			generatedDate: "2024-01-03",
			status: "Diproses",
			size: "-",
			description:
				"Ringkasan perubahan nilai aset, tren pasar, dan insight AI bulanan.",
		},
		{
			id: 6,
			title: "Tinjauan Cakupan Asuransi",
			type: "Asuransi",
			period: "2024",
			generatedDate: "2024-01-01",
			status: "Siap",
			size: "2,1 MB",
			description:
				"Analisis kecukupan perlindungan asuransi dan rekomendasi optimalisasi.",
		},
	];

	const periods = [
		"Semua",
		"Triwulan IV 2023",
		"Desember 2023",
		"Tahun Buku 2023",
		"Januari 2024",
		"2024",
	];

	const filteredReports = reports.filter((report) => {
		const matchesSearch =
			report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			report.description.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesType =
			selectedType === "Semua" || report.type === selectedType;
		const matchesPeriod =
			selectedPeriod === "Semua" || report.period === selectedPeriod;

		return matchesSearch && matchesType && matchesPeriod;
	});

	const generateReport = (type) => {
		// Simulasi pembuatan laporan
		console.log(`Membuat laporan ${type}...`);
	};

	return (
		<Layout>
			<div className="p-6 space-y-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Pembuatan Laporan AI
						</h1>
						<p className="mt-2 text-gray-600">
							Buat dan kelola laporan aset secara otomatis
						</p>
					</div>
					<div className="mt-4 sm:mt-0 flex space-x-3">
						<NewReportButton />
					</div>
				</div>

				{/* Kartu Quick Generate */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					{Object.entries(REPORT_TYPE).map(([key, { label, iconKey }]) => (
						<div
							key={key}
							onClick={() => generateReport(label)}
							className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
						>
							<div className="flex items-center space-x-4">
								<div className="p-3 bg-teal-50 rounded-lg">
									{iconKey === "bar-chart" && (
										<TrendingUp className="h-6 w-6 text-teal-600" />
									)}
									{iconKey === "clipboard" && (
										<FileText className="h-6 w-6 text-blue-600" />
									)}
									{iconKey === "calculator" && (
										<DollarSign className="h-6 w-6 text-green-600" />
									)}
									{iconKey === "shield" && (
										<Activity className="h-6 w-6 text-purple-600" />
									)}
									{/* Add other icons for remaining types */}
								</div>
								<div>
									<h3 className="font-semibold text-gray-900">{label}</h3>
									<p className="text-sm text-gray-600">
										Analisis {label.toLowerCase()}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Pencarian & Filter */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{/* Pencarian */}
						<div className="relative">
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Search className="h-5 w-5 text-gray-400" />
							</div>
							<input
								type="text"
								placeholder="Cari laporan…"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
							/>
						</div>

						{/* Filter Jenis */}
						<select
							value={selectedType}
							onChange={(e) => setSelectedType(e.target.value)}
							className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
						>
							{REPORT_TYPE.map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>

						{/* Filter Periode */}
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

				{/* Daftar Laporan */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200">
					<div className="p-6 border-b border-gray-200">
						<h2 className="text-lg font-semibold text-gray-900">
							Laporan Tergenerasi
						</h2>
						<p className="text-sm text-gray-600 mt-1">
							Menampilkan {filteredReports.length} dari {reports.length} laporan
						</p>
					</div>

					<div className="divide-y divide-gray-200">
						{filteredReports.map((report) => (
							<ReportCard key={report.id} report={report} />
						))}
					</div>
				</div>

				{/* Tidak Ada Hasil */}
				{filteredReports.length === 0 && (
					<div className="text-center py-12">
						<FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							Laporan tidak ditemukan
						</h3>
						<p className="text-gray-600">
							Coba ubah kriteria pencarian atau buat laporan baru
						</p>
					</div>
				)}

				<BannerAI />
			</div>
		</Layout>
	);
};

export default Reports;
