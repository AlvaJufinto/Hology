/** @format */

import { useEffect, useMemo, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { DollarSign, Search } from "lucide-react";

import NewReportButton from "../../components/Reports/NewReportButton";
import ReportCard from "../../components/Reports/ReportCard";
import Layout from "../../components/shared/Layout";
import { auth } from "../../dev/firebase";
import { subscribeReports } from "../../services/reports"; // Import the subscribe function
import { getLabel, pickIcon, REPORT_TYPE } from "../../utils";

const Reports = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [typeFilter, setTypeFilter] = useState("Semua");
	const [periodFilter, setPeriodFilter] = useState("Semua");
	const [rawReports, setRawReports] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let unsubReports = null;
		const unsubAuth = onAuthStateChanged(auth, (user) => {
			if (unsubReports) {
				unsubReports();
				unsubReports = null;
			}

			if (!user) {
				setRawReports([]);
				setLoading(false);
				return;
			}

			setLoading(true);
			unsubReports = subscribeReports(user.uid, (items) => {
				setRawReports(items);
				setLoading(false);
			});
		});

		return () => {
			if (unsubReports) unsubReports();
			if (unsubAuth) unsubAuth();
		};
	}, []);

	const reports = useMemo(() => {
		return rawReports.map((r) => {
			const key = r.iconKey || REPORT_TYPE[r.type]?.iconKey || "other";
			const Icon = pickIcon(key);

			let lastUpdatedStr = r.lastUpdated;
			if (r.lastUpdated && typeof r.lastUpdated.toDate === "function") {
				const d = r.lastUpdated.toDate();
				const mm = String(d.getMonth() + 1).padStart(2, "0");
				const dd = String(d.getDate()).padStart(2, "0");
				lastUpdatedStr = `${d.getFullYear()}-${mm}-${dd}`;
			}

			return {
				id: r.id,
				title: r.title,
				type: getLabel(REPORT_TYPE, r.type),
				status: getLabel(REPORT_TYPE, r.status),
				period: r.period || "-",
				generatedDate: lastUpdatedStr || "-",
				icon: Icon,
				description: r.description || "-",
			};
		});
	}, [rawReports]);

	const periodList = [
		"Semua",
		"Triwulan IV 2023",
		"Desember 2023",
		"Tahun Buku 2023",
		"Januari 2024",
		"2024",
	];

	const filteredReports = reports.filter((r) => {
		const term = searchTerm.trim().toLowerCase();
		const matchesSearch =
			term === "" ||
			r.title.toLowerCase().includes(term) ||
			r.description.toLowerCase().includes(term);

		const matchesType = typeFilter === "Semua" || r.type === typeFilter;
		const matchesPeriod = periodFilter === "Semua" || r.period === periodFilter;

		return matchesSearch && matchesType && matchesPeriod;
	});
	console.log("🚀 ~ Reports ~ filteredReports:", filteredReports);

	return (
		<Layout>
			<div className="p-6 space-y-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Manajemen Laporan
						</h1>
						<p className="mt-2 text-gray-600">
							Kelola laporan aset dan portofolio Anda
						</p>
					</div>
					{/*<Link
						to="/reports/create"
						className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
					>
						<Plus className="h-4 w-4 mr-2" />
						Tambah Laporan
					</Link>*/}
					<NewReportButton />
				</div>

				{/* Filter */}
				<div className="bg-white rounded-xl shadow-sm p-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{/* Pencarian */}
						<div className="relative">
							<Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
							<input
								type="text"
								placeholder="Cari laporan…"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
							/>
						</div>

						{/* Filter Jenis */}
						<select
							value={typeFilter}
							onChange={(e) => setTypeFilter(e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
						>
							{Object.entries(REPORT_TYPE).map(([key, { label }]) => (
								<option key={key} value={key}>
									{label}
								</option>
							))}
						</select>

						{/* Filter Periode */}
						<select
							value={periodFilter}
							onChange={(e) => setPeriodFilter(e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
						>
							{periodList.map((period) => (
								<option key={period} value={period}>
									{period}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* List */}
				<div className=" grid grid-cols-1  gap-6">
					{filteredReports.map((report) => (
						<ReportCard key={report.id} report={report} />
					))}
				</div>

				{/* Kosong / Loading */}
				{loading ? (
					<div className=" text-center py-12 text-gray-500">
						Memuat laporan…
					</div>
				) : (
					filteredReports.length === 0 && (
						<div className="text-center py-12">
							<DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium">Laporan tidak ditemukan</h3>
							<p className="text-gray-600">
								Coba ubah kata kunci/filter atau buat laporan baru.
							</p>
						</div>
					)
				)}
			</div>
		</Layout>
	);
};

export default Reports;
