/** @format */

import {
	Calendar,
	Download,
	Eye,
	FileText,
} from 'lucide-react';

import { formatIndoDate } from '../../utils';

export default function ReportCard({ report }) {
	console.log("🚀 ~ ReportCard ~ report:", report)
	return (
		<div
			key={report.id}
			className="w-full p-6 hover:bg-gray-50 transition-colors  flex items-start justify-between"
		>
			<div className="w-full flex-1 ">
				<div className="flex items-center space-x-3 mb-2">
					<h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
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
						{report.createdAt}
					</div>
					<div> Dibuat pada: {formatIndoDate(report.createdAt)}</div>
					{report.size !== "-" && <div>Ukuran: {report.size}</div>}
				</div>
			</div>

			<div className="flex items-center space-x-2 ml-4">
				<button className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
					<Eye className="h-4 w-4 mr-2" />
					Lihat
				</button>
				<button className="flex items-center px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
					<Download className="h-4 w-4 mr-2" />
					Unduh
				</button>
			</div>
		</div>
	);
}
