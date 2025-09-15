/** @format */

import { CheckCircle, Lock, User } from "lucide-react";

export default function Features() {
	return (
		<div className="bg-[url('./assets/bg/bg-2.png')] bg-cover bg-no-repeat bg-center">
			<div className="max-w-screen-2xl mx-auto flex flex-col items-center text-center px-4 md:px-6 min-h-screen py-20">
				{/* Title + Subtitle */}
				<h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
					Kelola Aset <br />
					Berhargamu di <span className="text-teal-500">Pintar Menjaga</span>
				</h1>
				<p className="text-gray-600 text-base md:text-lg max-w-2xl mb-12">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aset Anda
					tetap aman sekaligus bertumbuh bersama teknologi yang cerdas.
				</p>

				{/* Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
					{/* Card 1 */}
					<div className="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
						<div className="w-12 h-12 flex items-center justify-center bg-teal-100 text-teal-600 rounded-full mb-4">
							<User className="w-6 h-6" />
						</div>
						<h3 className="font-semibold text-lg">Aman</h3>
						<p className="text-gray-600 text-sm">
							Data dan aset Anda terlindungi dengan sistem keamanan berlapis.
						</p>
					</div>

					{/* Card 2 */}
					<div className="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
						<div className="w-12 h-12 flex items-center justify-center bg-teal-100 text-teal-600 rounded-full mb-4">
							<CheckCircle className="w-6 h-6" />
						</div>
						<h3 className="font-semibold text-lg">Terpercaya</h3>
						<p className="text-gray-600 text-sm">
							Dipercaya ribuan pengguna untuk mengelola aset dengan bijak.
						</p>
					</div>

					{/* Card 3 */}
					<div className="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
						<div className="w-12 h-12 flex items-center justify-center bg-teal-100 text-teal-600 rounded-full mb-4">
							<Lock className="w-6 h-6" />
						</div>
						<h3 className="font-semibold text-lg">Bertumbuh</h3>
						<p className="text-gray-600 text-sm">
							Aset Anda tidak hanya aman, tapi juga berkembang dengan strategi
							cerdas.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
