/** @format */

import Hero from "../components/Hero";

export default function Home() {
	return (
		<>
			<div className="bg-[url('./assets/bg/bg-1.png')] bg-cover bg-no-repeat bg-center">
				<Hero />
			</div>
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
						<div className="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
							<div className="w-12 h-12 flex items-center justify-center bg-teal-100 text-teal-600 rounded-full mb-4">
								{/* Icon Lucide */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-6 h-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8c-1.657 0-3-1.343-3-3S10.343 2 12 2s3 1.343 3 3-1.343 3-3 3zM19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2"
									/>
								</svg>
							</div>
							<h3 className="font-semibold text-lg">Aman</h3>
							<p className="text-gray-600 text-sm">
								Data dan aset Anda terlindungi dengan sistem keamanan berlapis.
							</p>
						</div>

						<div className="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
							<div className="w-12 h-12 flex items-center justify-center bg-teal-100 text-teal-600 rounded-full mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-6 h-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 17l6-6 4 4 8-8"
									/>
								</svg>
							</div>
							<h3 className="font-semibold text-lg">Terpercaya</h3>
							<p className="text-gray-600 text-sm">
								Dipercaya ribuan pengguna untuk mengelola aset dengan bijak.
							</p>
						</div>

						<div className="bg-white/90 backdrop-blur-lg shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition">
							<div className="w-12 h-12 flex items-center justify-center bg-teal-100 text-teal-600 rounded-full mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-6 h-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M11 11V7a4 4 0 018 0v4m0 0v10a2 2 0 01-2 2H7a2 2 0 01-2-2V11h14z"
									/>
								</svg>
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
		</>
	);
}
