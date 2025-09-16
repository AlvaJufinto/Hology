/** @format */

import { useState } from "react";

import { REPORT_TYPE } from "../../utils"; // Import enum untuk jenis laporan

export default function NewReportButton() {
	const [modalOpen, setModalOpen] = useState(false); // State modal
	const [newReport, setNewReport] = useState({
		name: "",
		type: "semua", // default to 'semua'
		note: "",
	});

	// Fungsi untuk menangani perubahan input
	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewReport((prevReport) => ({
			...prevReport,
			[name]: value,
		}));
	};

	// Fungsi untuk menangani pengiriman form
	const handleSubmit = (e) => {
		e.preventDefault();
		// Simulasi pembuatan laporan baru
		console.log("Membuat laporan baru: ", newReport);
		setModalOpen(false); // Tutup modal setelah laporan disimpan
	};

	// Fungsi untuk menangani klik di luar modal agar tidak menutup modal
	const handleModalClick = (e) => {
		e.stopPropagation(); // Mencegah penutupan modal ketika klik dalam modal
	};

	return (
		<div>
			{/* Tombol untuk membuka modal */}
			<button
				onClick={() => setModalOpen(true)} // Membuka modal
				className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
			>
				Buat Laporan Baru
			</button>

			{/* Modal untuk input laporan baru */}
			{modalOpen && (
				<div
					onClick={() => setModalOpen(false)} // Menutup modal saat klik di luar
					className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex justify-center items-center z-50 transition-all duration-300 ease-in-out"
				>
					<div
						onClick={handleModalClick} // Mencegah modal tertutup saat klik di dalam
						className="bg-white p-6 rounded-lg w-1/3 transform transition-all duration-300 ease-in-out opacity-100 scale-100"
					>
						<h2 className="text-2xl font-semibold mb-4">Buat Laporan Baru</h2>
						<form onSubmit={handleSubmit} className="space-y-4">
							{/* Input Nama Laporan */}
							<div>
								<label
									htmlFor="name"
									className="block text-sm font-medium text-gray-700"
								>
									Nama Laporan *
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={newReport.name}
									onChange={handleChange}
									required
									className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
									placeholder="Masukkan nama laporan"
								/>
							</div>

							{/* Dropdown Jenis Laporan */}
							<div>
								<label
									htmlFor="type"
									className="block text-sm font-medium text-gray-700"
								>
									Jenis Laporan *
								</label>
								<select
									id="type"
									name="type"
									value={newReport.type}
									onChange={handleChange}
									required
									className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
								>
									{Object.entries(REPORT_TYPE).map(([key, { label }]) => (
										<option key={key} value={key}>
											{label}
										</option>
									))}
								</select>
							</div>

							{/* Input Catatan (Opsional) */}
							<div>
								<label
									htmlFor="note"
									className="block text-sm font-medium text-gray-700"
								>
									Catatan (Opsional)
								</label>
								<textarea
									id="note"
									name="note"
									value={newReport.note}
									onChange={handleChange}
									className="block w-full px-3 py-2 border border-gray-300 rounded-lg"
									placeholder="Tambahkan catatan (opsional)"
								></textarea>
							</div>

							{/* Tombol Batal dan Simpan */}
							<div className="flex justify-end space-x-4 mt-4">
								<button
									type="button"
									onClick={() => setModalOpen(false)} // Menutup modal
									className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
								>
									Batal
								</button>
								<button
									type="submit"
									className="px-4 py-2 bg-teal-600 text-white rounded-lg"
								>
									Simpan Laporan
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
