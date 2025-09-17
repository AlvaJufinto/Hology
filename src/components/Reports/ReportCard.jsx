/** @format */
import { useMemo, useState } from "react";

import { Calendar, Download, Eye, FileText, X } from "lucide-react";

import { estimateHtmlSizeMB } from "../../utils";

function isHtmlDocument(str) {
	if (typeof str !== "string") return false;
	const s = str.trim().toLowerCase();
	return s.startsWith("<!doctype html") || s.includes("<html");
}

function IframeModal({ open, onClose, html }) {
	if (!open) return null;
	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center">
			{/* backdrop */}
			<div
				className="absolute inset-0 bg-black/50"
				onClick={onClose}
				aria-hidden="true"
			/>
			{/* dialog */}
			<div className="relative z-[101] w-[95vw] h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden">
				<div className="flex items-center justify-between px-4 py-3 border-b">
					<h4 className="font-semibold">Pratinjau Laporan</h4>
					<button
						onClick={onClose}
						className="p-2 rounded-lg hover:bg-gray-100"
						aria-label="Tutup"
					>
						<X className="h-5 w-5" />
					</button>
				</div>
				{/* iframe */}
				<iframe
					title="report-preview"
					className="w-full h-[calc(90vh-56px)]"
					// Izinkan script & akses origin sendiri agar Chart.js di CDN bisa load
					sandbox="allow-scripts allow-same-origin"
					srcDoc={html}
				/>
			</div>
		</div>
	);
}

export default function ReportCard({ report }) {
	const [open, setOpen] = useState(false);

	const size = useMemo(() => {
		try {
			return estimateHtmlSizeMB(report?.content ?? "");
		} catch {
			return "-";
		}
	}, [report?.content]);

	const date = useMemo(() => {
		const ts = report?.createdAt;
		if (!ts) return "-";
		if (typeof ts.toDate === "function")
			return ts.toDate().toLocaleDateString("id-ID");
		if (typeof ts.seconds === "number" && typeof ts.nanoseconds === "number") {
			return new Date(
				ts.seconds * 1000 + ts.nanoseconds / 1e6
			).toLocaleDateString("id-ID");
		}
		// fallback kalau sudah string/date
		try {
			return new Date(ts).toLocaleDateString("id-ID");
		} catch {
			return "-";
		}
	}, [report?.createdAt]);

	const htmlReady = isHtmlDocument(report?.content);

	const handlePreview = () => {
		if (htmlReady) setOpen(true);
	};

	const handleDownload = () => {
		const name = (report?.title || "report")
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/(^-|-$)/g, "");
		const mime = htmlReady ? "text/html" : "text/plain";
		const ext = htmlReady ? "html" : "txt";
		const blob = new Blob([report?.content ?? ""], {
			type: `${mime};charset=utf-8`,
		});
		const url = URL.createObjectURL(blob);
		const a = Object.assign(document.createElement("a"), {
			href: url,
			download: `${name || "report"}.${ext}`,
		});
		document.body.appendChild(a);
		a.click();
		a.remove();
		URL.revokeObjectURL(url);
	};

	return (
		<>
			<div
				key={report.id}
				className="w-full p-6 hover:bg-gray-50 transition-colors flex items-start justify-between"
			>
				<div className="w-full flex-1">
					<div className="flex items-center space-x-3 mb-2">
						<h3 className="text-lg font-medium text-gray-900">
							{report.title}
						</h3>
					</div>
					{report.description && (
						<p className="text-gray-600 mb-3">{report.description}</p>
					)}
					<div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
						<div className="flex items-center capitalize">
							<FileText className="h-4 w-4 mr-1" />
							{report.type}
						</div>
						<div className="flex items-center">
							<Calendar className="h-4 w-4 mr-1" />
							{date}
						</div>
						{size !== "-" && <div>Ukuran: {size} MB</div>}
					</div>
				</div>

				<div className="flex items-center space-x-2 ml-4">
					<button
						disabled={!htmlReady}
						onClick={handlePreview}
						className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
							htmlReady
								? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
								: "text-gray-400 cursor-not-allowed"
						}`}
						title={
							htmlReady ? "Pratinjau" : "Konten bukan dokumen HTML lengkap"
						}
					>
						<Eye className="h-4 w-4 mr-2" />
						Lihat
					</button>
					<button
						onClick={handleDownload}
						className="flex items-center px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
					>
						<Download className="h-4 w-4 mr-2" />
						Unduh
					</button>
				</div>
			</div>

			{/* Modal */}
			<IframeModal
				open={open}
				onClose={() => setOpen(false)}
				html={report?.content ?? ""}
			/>
		</>
	);
}
