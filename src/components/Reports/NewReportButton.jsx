/** @format */

import { useState } from "react";

import { Loader } from "lucide-react";

import { auth } from "../../dev/firebase";
import NewReportModal from "./NewReportModal";

export default function NewReportButton() {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const uid = auth?.currentUser?.uid;

	return (
		<>
			<button
				onClick={() => setOpen(true)}
				className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-60"
				disabled={loading || !uid}
				title={!uid ? "Harus login dulu" : undefined}
			>
				{loading ? (
					<Loader className="animate-spin" size={20} />
				) : (
					"Buat Laporan Baru"
				)}
			</button>

			<NewReportModal
				open={open}
				onClose={() => setOpen(false)}
				setLoading={setLoading} // diteruskan ke backend bila perlu
				uid={uid}
			/>
		</>
	);
}
