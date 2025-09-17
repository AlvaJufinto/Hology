/** @format */

const AboutUs = () => {
	return (
		<div className="bg-[#F9FFE5] h-[800px] bg-cover bg-no-repeat bg-top-right">
			{/* Container untuk semua konten */}
			<div className="max-w-screen-2xl mx-auto flex flex-col items-center justify-center text-center px-4 md:px-6 py-20">
				<div className="flex flex-col items-center text-center">
					<h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-10">
						About <br />
						<span className="text-teal-500">Pintar Menjaga</span>
					</h1>
					<p className="text-gray-600 text-base md:text-lg max-w-2xl mb-12">
						PintarMenjaga adalah platform manajemen aset cerdas berbasis AI yang
						membantu pengguna mengelola, memantau, dan memaksimalkan nilai
						portofolio mereka secara real-time. Dengan fitur analisis pasar,
						prediksi berbasis machine learning, serta rekomendasi notaris
						terpercaya, PintarMenjaga menghadirkan solusi digital yang
						transparan, efisien, dan aman bagi siapa saja yang ingin mengelola
						kekayaan pribadi dengan lebih mudah dan terarah.
					</p>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
