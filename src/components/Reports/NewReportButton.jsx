/** @format */

import { useState } from "react";

import { Loader } from "lucide-react"; // Import Lucide Loader

import { auth } from "../../dev/firebase";
import { generateReport } from "../../services/reports";
import { REPORT_TYPE } from "../../utils"; // Import enum for report types

export default function NewReportButton() {
	const [modalOpen, setModalOpen] = useState(false); // Modal state
	const [newReport, setNewReport] = useState({
		name: "",
		type: "semua",
		note: "",
	});
	const [loading, setLoading] = useState(false); // Loading state for button
	const uid = auth.currentUser.uid;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewReport((prevReport) => ({
			...prevReport,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await generateReport(uid, {
			type: newReport.type,
			note: newReport.note,
			setLoading, // Pass setLoading to backend function
		});
		setModalOpen(false); // Close the modal after report is created
	};

	const handleModalClick = (e) => {
		e.stopPropagation(); // Prevent modal close when clicking inside
	};

	return (
		<div>
			<button
				onClick={() => setModalOpen(true)} // Open modal
				className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
				disabled={loading} // Disable the button when loading
			>
				{loading ? (
					<Loader className="animate-spin" size={24} />
				) : (
					"Buat Laporan Baru"
				)}
			</button>

			{modalOpen && (
				<div
					onClick={() => setModalOpen(false)}
					className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex justify-center items-center z-50 transition-all duration-300 ease-in-out"
				>
					<div
						onClick={handleModalClick}
						className="bg-white p-6 rounded-lg w-1/3 transform transition-all duration-300 ease-in-out opacity-100 scale-100"
					>
						<h2 className="text-2xl font-semibold mb-4">Buat Laporan Baru</h2>
						<form onSubmit={handleSubmit} className="space-y-4">
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

							<div className="flex justify-end space-x-4 mt-4">
								<button
									type="button"
									onClick={() => setModalOpen(false)} // Close modal
									className="cursor-pointer px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
								>
									Tutup
								</button>
								<button
									type="submit"
									className="cursor-pointer px-4 py-2 bg-teal-600 text-white rounded-lg"
									disabled={loading} // Disable the button while loading
								>
									{loading ? (
										<Loader className="animate-spin" size={24} />
									) : (
										"Simpan Laporan"
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
