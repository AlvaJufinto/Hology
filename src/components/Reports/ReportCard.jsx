/** @format */

import { Calendar, Download, Eye, FileText } from "lucide-react";

import { formatIndoDate } from "../../utils";

export default function ReportCard({ report }) {
	return (
		<div key={report.id} className="p-6 hover:bg-gray-50 transition-colors">
			<div className="flex items-start justify-between">
				<div className="flex-1">
					<div className="flex items-center space-x-3 mb-2">
						<h3 className="text-lg font-medium text-gray-900">
							{report.title}
						</h3>
						<span
							className={`px-2 py-1 rounded-full text-xs font-medium ${
								report.status === "Siap"
									? "bg-green-100 text-green-700"
									: "bg-yellow-100 text-yellow-700"
							}`}
						>
							{report.status}
						</span>
					</div>

					<p className="text-gray-600 mb-3">{report.description}</p>

					<div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
						<div className="flex items-center">
							<FileText className="h-4 w-4 mr-1" />
							{report.type}
						</div>
						<div className="flex items-center">
							<Calendar className="h-4 w-4 mr-1" />
							{report.period}
						</div>
						<div> Dibuat pada: {formatIndoDate(report.generatedDate)}</div>
						{report.size !== "-" && <div>Ukuran: {report.size}</div>}
					</div>
				</div>

				<div className="flex items-center space-x-2 ml-4">
					{report.status === "Siap" ? (
						<>
							<button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
								<Eye className="h-4 w-4 mr-2" />
								Lihat
							</button>
							<button className="flex items-center px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
								<Download className="h-4 w-4 mr-2" />
								Unduh
							</button>
						</>
					) : (
						<div className="flex items-center px-3 py-2 text-yellow-600">
							<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
							Diproses…
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
