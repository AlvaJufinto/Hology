/** @format */

import { useEffect, useMemo, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { DollarSign, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

import AssetCard from "../../components/Asset/AssetCard";
import Layout from "../../components/shared/Layout";
import { auth } from "../../dev/firebase";
import { subscribeAssets } from "../../services/assets";
import {
	ASSET_STATUS,
	ASSET_STATUS_OPTIONS,
	ASSET_TYPE,
	ASSET_TYPE_OPTIONS,
	formatIDR,
	getLabel,
	getTrend,
	pickIcon,
} from "../../utils";

const Assets = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [typeFilter, setTypeFilter] = useState("Semua");
	const [statusFilter, setStatusFilter] = useState("Semua");

	const [rawAssets, setRawAssets] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let unsubAssets = null;
		const unsubAuth = onAuthStateChanged(auth, (u) => {
			if (unsubAssets) {
				unsubAssets();
				unsubAssets = null;
			}

			if (!u) {
				setRawAssets([]);
				setLoading(false);
				return;
			}

			setLoading(true);
			unsubAssets = subscribeAssets(u.uid, (items) => {
				setRawAssets(items);
				setLoading(false);
			});
		});

		return () => {
			if (unsubAssets) unsubAssets();
			if (unsubAuth) unsubAuth();
		};
	}, []);

	const assets = useMemo(() => {
		return rawAssets.map((a) => {
			const key = a.iconKey || ASSET_TYPE[a.type]?.iconKey || "other";
			const Icon = pickIcon(key);

			let lastUpdatedStr = a.lastUpdated;
			if (a.lastUpdated && typeof a.lastUpdated.toDate === "function") {
				const d = a.lastUpdated.toDate();
				const mm = String(d.getMonth() + 1).padStart(2, "0");
				const dd = String(d.getDate()).padStart(2, "0");
				lastUpdatedStr = `${d.getFullYear()}-${mm}-${dd}`;
			}

			return {
				id: a.id,
				name: a.name,
				type: getLabel(ASSET_TYPE, a.type),
				currentValue: a.currentValue ?? 0,
				purchaseValue: a.purchaseValue ?? 0,
				trend: getTrend(a.currentValue, a.purchaseValue),
				status: getLabel(ASSET_STATUS, a.status),
				lastUpdated: lastUpdatedStr || "-",
				location: a.location || "-",
				icon: Icon,
			};
		});
	}, [rawAssets]);

	const jenisList = ["Semua", ...ASSET_TYPE_OPTIONS.map((o) => o.label)];
	const statusList = ["Semua", ...ASSET_STATUS_OPTIONS.map((o) => o.label)];

	const filteredAssets = assets.filter((a) => {
		const term = searchTerm.trim().toLowerCase();
		const matchesSearch =
			term === "" ||
			a.name.toLowerCase().includes(term) ||
			a.type.toLowerCase().includes(term) ||
			a.location.toLowerCase().includes(term);

		const matchesType = typeFilter === "Semua" || a.type === typeFilter;
		const matchesStatus = statusFilter === "Semua" || a.status === statusFilter;

		return matchesSearch && matchesType && matchesStatus;
	});

	const totalValue = assets.reduce((s, a) => s + (a.currentValue || 0), 0);
	const totalGain = assets.reduce(
		(s, a) => s + ((a.currentValue || 0) - (a.purchaseValue || 0)),
		0
	);
	const totalPurchase = assets.reduce((s, a) => s + (a.purchaseValue || 0), 0);
	const totalGainPercent =
		totalPurchase > 0 ? (totalGain / totalPurchase) * 100 : 0;

	return (
		<Layout>
			<div className="p-6 space-y-6">
				{/* Header */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">Manajemen Aset</h1>
						<p className="mt-2 text-gray-600">
							Pantau & kelola portofolio aset kamu di Indonesia
						</p>
					</div>
					<Link
						to="/assets/create"
						className="mt-4 sm:mt-0 flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
					>
						<Plus className="h-4 w-4 mr-2" />
						Tambah Aset
					</Link>
				</div>

				{/* Ringkasan */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="bg-white rounded-xl shadow-sm p-6">
						<p className="text-sm text-gray-600">Total Nilai Portofolio</p>
						<p className="text-2xl font-bold">{formatIDR(totalValue)}</p>
					</div>
					<div className="bg-white rounded-xl shadow-sm p-6">
						<p className="text-sm text-gray-600">Jumlah Aset</p>
						<p className="text-2xl font-bold">{assets.length}</p>
					</div>
					<div className="bg-white rounded-xl shadow-sm p-6">
						<p className="text-sm text-gray-600">Total Untung/Rugi</p>
						<p
							className={`text-2xl font-bold ${
								totalGain >= 0 ? "text-green-600" : "text-red-600"
							}`}
						>
							{(totalGain >= 0 ? "+" : "-") + formatIDR(Math.abs(totalGain))}
						</p>
						<p
							className={`${
								totalGain >= 0 ? "text-green-600" : "text-red-600"
							} text-sm`}
						>
							{(totalGain >= 0 ? "+" : "-") + totalGainPercent.toFixed(1)}%
						</p>
					</div>
				</div>

				{/* Filter */}
				<div className="bg-white rounded-xl shadow-sm p-6">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<div className="relative">
							<Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
							<input
								type="text"
								placeholder="Cari aset (emas, rumah, saham, dll)…"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
							/>
						</div>

						<select
							value={typeFilter}
							onChange={(e) => setTypeFilter(e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
						>
							{jenisList.map((j) => (
								<option key={j} value={j}>
									{j}
								</option>
							))}
						</select>

						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
						>
							{statusList.map((s) => (
								<option key={s} value={s}>
									{s}
								</option>
							))}
						</select>
					</div>
				</div>

				{/* List */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredAssets.map((asset) => (
						<AssetCard key={asset.id} asset={asset} />
					))}
				</div>

				{/* Kosong / Loading */}
				{loading ? (
					<div className="text-center py-12 text-gray-500">Memuat aset…</div>
				) : (
					filteredAssets.length === 0 && (
						<div className="text-center py-12">
							<DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<h3 className="text-lg font-medium">Aset tidak ditemukan</h3>
							<p className="text-gray-600">
								Coba ubah kata kunci/filter atau tambah aset baru.
							</p>
						</div>
					)
				)}
			</div>
		</Layout>
	);
};

export default Assets;
