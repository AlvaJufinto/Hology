/** @format */

import { useMemo, useState } from "react";

import { Filter, Search, Users } from "lucide-react";

import NotaryCard from "../../components/NotaryFinder/NotaryCard";
import Layout from "../../components/shared/Layout";

const NotaryFinder = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [locationFilter, setLocationFilter] = useState("");
	const [specializationFilter, setSpecializationFilter] = useState("");
	const [showFilters, setShowFilters] = useState(false);

	// --- Data Notaris Indonesia (contoh) ---
	const notaries = useMemo(
		() => [
			{
				id: 1,
				name: "Notaris Ayu Pramesti, S.H., M.Kn.",
				location: "Jakarta Selatan",
				specialization: "Akta Jual Beli (AJB) & Sertifikat Tanah",
				rating: 4.9,
				reviews: 127,
				phone: "+62 812 1234 5678",
				email: "ayu.pramesti@notaris.id",
				verified: true,
				experienceYears: 10,
				languages: ["Indonesia", "Inggris"],
				availability: "Bisa hari ini",
			},
			{
				id: 2,
				name: "Notaris Michael Santoso, S.H., M.Kn.",
				location: "Bandung",
				specialization: "Pendirian PT, CV & Perubahan",
				rating: 4.8,
				reviews: 89,
				phone: "+62 813 9876 5432",
				email: "michael.santoso@notaris.id",
				verified: true,
				experienceYears: 12,
				languages: ["Indonesia"],
				availability: "Bisa besok",
			},
			{
				id: 3,
				name: "Notaris Ni Luh Saras, S.H., M.Kn.",
				location: "Denpasar",
				specialization: "Legalisasi Dokumen & Perjanjian",
				rating: 4.7,
				reviews: 156,
				phone: "+62 856 4567 8910",
				email: "niluh.saras@notaris.id",
				verified: true,
				experienceYears: 7,
				languages: ["Indonesia", "Inggris"],
				availability: "Bisa hari ini",
			},
			{
				id: 4,
				name: "Notaris Rahmad Hidayat, S.H., M.Kn.",
				location: "Surabaya",
				specialization: "Waris, Hibah & Wasiat",
				rating: 4.9,
				reviews: 203,
				phone: "+62 811 1112 222",
				email: "rahmad.hidayat@notaris.id",
				verified: true,
				experienceYears: 15,
				languages: ["Indonesia"],
				availability: "Bisa minggu ini",
			},
			{
				id: 5,
				name: "Notaris Clara Putri, S.H., M.Kn.",
				location: "Yogyakarta",
				specialization: "Apostille & Dokumen Luar Negeri",
				rating: 4.8,
				reviews: 94,
				phone: "+62 812 333 0000",
				email: "clara.putri@notaris.id",
				verified: true,
				experienceYears: 9,
				languages: ["Indonesia", "Inggris", "Mandarin"],
				availability: "Bisa hari ini",
			},
			{
				id: 6,
				name: "Notaris Andi Pratama, S.H., M.Kn.",
				location: "Makassar",
				specialization: "Perjanjian & Kuasa",
				rating: 4.6,
				reviews: 78,
				phone: "+62 877 766 5544",
				email: "andi.pratama@notaris.id",
				verified: true,
				experienceYears: 7,
				languages: ["Indonesia"],
				availability: "Bisa besok",
			},
		],
		[]
	);

	// --- Filter Indonesia (santai & familiar) ---
	const specializations = [
		"Semua",
		"Akta Jual Beli (AJB) & Sertifikat Tanah",
		"Pendirian PT, CV & Perubahan",
		"Perjanjian & Kuasa",
		"Waris, Hibah & Wasiat",
		"Legalisasi Dokumen & Perjanjian",
		"Apostille & Dokumen Luar Negeri",
	];

	const locations = [
		"Semua",
		"Jakarta Selatan",
		"Bandung",
		"Surabaya",
		"Yogyakarta",
		"Denpasar",
		"Makassar",
	];

	// --- Filtering ---
	const filteredNotaries = notaries.filter((n) => {
		const term = searchTerm.toLowerCase();
		const matchesSearch =
			n.name.toLowerCase().includes(term) ||
			n.specialization.toLowerCase().includes(term) ||
			n.location.toLowerCase().includes(term);

		const matchesLocation =
			locationFilter === "" ||
			locationFilter === "Semua" ||
			n.location === locationFilter;

		const matchesSpecialization =
			specializationFilter === "" ||
			specializationFilter === "Semua" ||
			n.specialization === specializationFilter;

		return matchesSearch && matchesLocation && matchesSpecialization;
	});

	return (
		<Layout>
			<div className="p-6 space-y-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">
							Cari Notaris & PPAT Terpercaya di Sekitarmu
						</h1>
						<p className="mt-2 text-gray-600">
							Temukan notaris/PPAT bersertifikat untuk urusan AJB, PT/CV, waris,
							dan lainnya.
						</p>
					</div>
					<div className="mt-4 sm:mt-0">
						<button
							onClick={() => setShowFilters((s) => !s)}
							className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
						>
							<Filter className="h-4 w-4 mr-2" />
							Filter
						</button>
					</div>
				</div>

				{/* Search + Filters */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					{/* Search Bar */}
					<div className="relative mb-4">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Search className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type="text"
							placeholder="Cari nama, jenis layanan, atau kota…"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
						/>
					</div>

					{/* Filters */}
					{showFilters && (
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Pilih Kota
								</label>
								<select
									value={locationFilter}
									onChange={(e) => setLocationFilter(e.target.value)}
									className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
								>
									{locations.map((location) => (
										<option key={location} value={location}>
											{location}
										</option>
									))}
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Jenis Layanan
								</label>
								<select
									value={specializationFilter}
									onChange={(e) => setSpecializationFilter(e.target.value)}
									className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
								>
									{specializations.map((spec) => (
										<option key={spec} value={spec}>
											{spec}
										</option>
									))}
								</select>
							</div>
						</div>
					)}
				</div>

				{/* Results Count */}
				<div className="flex items-center justify-between">
					<p className="text-gray-600">
						Menampilkan {filteredNotaries.length} dari {notaries.length} notaris
						terverifikasi
					</p>
				</div>

				{/* Notaries Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredNotaries.map((notary) => (
						<NotaryCard key={notary.id} notary={notary} />
					))}
				</div>

				{/* No Results */}
				{filteredNotaries.length === 0 && (
					<div className="text-center py-12">
						<Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							Tidak ada notaris ditemukan
						</h3>
						<p className="text-gray-600">
							Coba ubah kata kunci pencarian atau filter
						</p>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default NotaryFinder;
