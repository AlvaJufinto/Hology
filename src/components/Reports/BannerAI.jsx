/** @format */

import { Activity } from "lucide-react";

export default function BannerAI() {
	return (
		<div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200 p-6">
			<div className="flex items-start space-x-4">
				<div className="p-3 bg-teal-100 rounded-lg">
					<Activity className="h-6 w-6 text-teal-600" />
				</div>
				<div className="flex-1">
					<h3 className="text-lg font-semibold text-gray-900 mb-2">
						Pembuatan Laporan Berbasis AI
					</h3>
					<p className="text-gray-700 mb-3">
						AI menganalisis data portofolio Anda untuk menghasilkan laporan yang
						ringkas dan mudah dipahami:
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
						<ul className="space-y-1">
							<li>• Analisis tren pasar</li>
							<li>• Tolok ukur kinerja (benchmark)</li>
							<li>• Penilaian risiko</li>
						</ul>
						<ul className="space-y-1">
							<li>• Insight optimasi pajak</li>
							<li>• Proyeksi nilai di masa depan</li>
							<li>• Rekomendasi yang dapat ditindaklanjuti</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
