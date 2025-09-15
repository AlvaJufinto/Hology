/** @format */

import { useState } from "react";

import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/shared/Layout";
import { auth } from "../../dev/firebase";
import { addAsset } from "../../services/assets";
import {
	ASSET_PURPOSE_OPTIONS,
	ASSET_STATUS_OPTIONS,
	ASSET_TYPE,
	ASSET_TYPE_OPTIONS,
	formatIDR,
} from "../../utils";

const AssetsCreate = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "",
		type: "",
		status: "active",
		purpose: "",
		purchaseValue: "",
		currentValue: "",
		purchaseDate: "",
		location: "",
		description: "",
	});
	const [loading, setLoading] = useState(false);

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	async function handleSubmit(e) {
		e.preventDefault();
		if (!auth.currentUser) {
			alert("Kamu harus login dulu.");
			return;
		}

		// validasi minimal
		if (!formData.name.trim()) return alert("Nama aset wajib diisi.");
		if (!formData.type) return alert("Pilih jenis aset.");
		if (!formData.purchaseValue) return alert("Harga beli wajib diisi.");
		if (!formData.purchaseDate) return alert("Tanggal beli wajib diisi.");

		setLoading(true);
		try {
			const uid = auth.currentUser.uid;

			// angka
			const purchaseValueNum = Number(formData.purchaseValue);
			const currentValueNum =
				formData.currentValue === ""
					? purchaseValueNum
					: Number(formData.currentValue);

			if (Number.isNaN(purchaseValueNum) || Number.isNaN(currentValueNum)) {
				alert("Nilai rupiah tidak valid.");
				setLoading(false);
				return;
			}
			const iconKeyDefault = ASSET_TYPE[formData.type]?.iconKey || "other";

			const payload = {
				name: formData.name.trim(),
				type: formData.type,
				status: formData.status,
				purpose: formData.purpose || undefined, // opsional
				purchaseValue: purchaseValueNum,
				currentValue: currentValueNum,
				purchaseDate: formData.purchaseDate, // "YYYY-MM-DD"
				location: formData.location?.trim() || "",
				description: formData.description?.trim() || "",
				iconKey: iconKeyDefault,
				// ownerUid/createdAt/updatedAt/lastUpdated diisi di addAsset()
			};

			await addAsset(uid, payload);
			navigate("/assets");
		} catch (err) {
			console.error(err);
			alert("Gagal membuat aset. Coba lagi.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<Layout>
			<div className="p-6 max-w-4xl mx-auto">
				{/* Header */}
				<div className="flex items-center space-x-4 mb-6">
					<button
						onClick={() => navigate("/assets")}
						className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
						type="button"
					>
						<ArrowLeft className="h-5 w-5 text-gray-600" />
					</button>
					<div>
						<h1 className="text-3xl font-bold text-gray-900">Tambah Aset</h1>
						<p className="text-gray-600">
							Buat catatan aset baru untuk portofoliomu
						</p>
					</div>
				</div>

				{/* Form */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
					<form onSubmit={handleSubmit} className="space-y-8">
						{/* Informasi Dasar */}
						<div>
							<h2 className="text-xl font-semibold text-gray-900 mb-4">
								Informasi Dasar
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label
										htmlFor="name"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Nama Aset *
									</label>
									<input
										type="text"
										id="name"
										name="name"
										required
										value={formData.name}
										onChange={handleChange}
										className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
										placeholder="cth: Rumah Cluster Bandung (SHM)"
									/>
								</div>

								<div>
									<label
										htmlFor="type"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Jenis Aset *
									</label>
									<select
										id="type"
										name="type"
										required
										value={formData.type}
										onChange={handleChange}
										className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
									>
										<option value="">Pilih jenis aset</option>
										{ASSET_TYPE_OPTIONS.map((opt) => (
											<option key={opt.value} value={opt.value}>
												{opt.label}
											</option>
										))}
									</select>
								</div>

								<div>
									<label
										htmlFor="status"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Status
									</label>
									<select
										id="status"
										name="status"
										value={formData.status}
										onChange={handleChange}
										className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
									>
										{ASSET_STATUS_OPTIONS.map((opt) => (
											<option key={opt.value} value={opt.value}>
												{opt.label}
											</option>
										))}
									</select>
								</div>

								{/* Purpose (opsional) */}
								<div>
									<label
										htmlFor="purpose"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Tujuan Aset (opsional)
									</label>
									<select
										id="purpose"
										name="purpose"
										value={formData.purpose}
										onChange={handleChange}
										className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
									>
										<option value="">Tanpa tujuan</option>
										{ASSET_PURPOSE_OPTIONS.map((opt) => (
											<option key={opt.value} value={opt.value}>
												{opt.label}
											</option>
										))}
									</select>
								</div>

								<div className="md:col-span-2">
									<label
										htmlFor="location"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Lokasi
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<MapPin className="h-5 w-5 text-gray-400" />
										</div>
										<input
											type="text"
											id="location"
											name="location"
											value={formData.location}
											onChange={handleChange}
											className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
											placeholder="cth: Bandung, Jawa Barat"
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Informasi Finansial */}
						<div>
							<h2 className="text-xl font-semibold text-gray-900 mb-4">
								Informasi Finansial
							</h2>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label
										htmlFor="purchaseValue"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Harga Beli (Rp) *
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											Rp
										</div>
										<input
											type="number"
											id="purchaseValue"
											name="purchaseValue"
											required
											value={formData.purchaseValue}
											onChange={handleChange}
											className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
											placeholder="0"
											min="0"
										/>
									</div>
									<p className="text-xs text-gray-500 mt-1">
										{formData.purchaseValue
											? formatIDR(Number(formData.purchaseValue))
											: ""}
									</p>
								</div>

								<div>
									<label
										htmlFor="currentValue"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Nilai Saat Ini (Rp)
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											Rp
										</div>
										<input
											type="number"
											id="currentValue"
											name="currentValue"
											value={formData.currentValue}
											onChange={handleChange}
											className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
											placeholder="Biarkan kosong bila sama dengan harga beli"
											min="0"
										/>
									</div>
									<p className="text-xs text-gray-500 mt-1">
										{formData.currentValue
											? formatIDR(Number(formData.currentValue))
											: formData.purchaseValue
											? `Jika kosong, akan di-set = ${formatIDR(
													Number(formData.purchaseValue)
											  )}`
											: ""}
									</p>
								</div>

								<div>
									<label
										htmlFor="purchaseDate"
										className="block text-sm font-medium text-gray-700 mb-2"
									>
										Tanggal Beli *
									</label>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
											<Calendar className="h-5 w-5 text-gray-400" />
										</div>
										<input
											type="date"
											id="purchaseDate"
											name="purchaseDate"
											required
											value={formData.purchaseDate}
											onChange={handleChange}
											className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
										/>
									</div>
								</div>
							</div>
						</div>

						{/* Deskripsi */}
						<div>
							<h2 className="text-xl font-semibold text-gray-900 mb-4">
								Detail Tambahan
							</h2>
							<label
								htmlFor="description"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Deskripsi
							</label>
							<textarea
								id="description"
								name="description"
								rows={4}
								value={formData.description}
								onChange={handleChange}
								className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
								placeholder="Catatan tambahan tentang aset…"
							/>
						</div>

						{/* Aksi */}
						<div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
							<button
								type="button"
								onClick={() => navigate("/assets")}
								className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
							>
								Batal
							</button>
							<button
								type="submit"
								disabled={loading}
								className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
							>
								{loading ? (
									<div className="flex items-center">
										<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
										Menyimpan…
									</div>
								) : (
									"Simpan Aset"
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default AssetsCreate;
