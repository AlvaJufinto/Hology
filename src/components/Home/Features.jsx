/** @format */

import Img1 from "../../assets/img/home/1.png";
import Img2 from "../../assets/img/home/2.png";
import Img3 from "../../assets/img/home/3.png";
import Img4 from "../../assets/img/home/4.png";

const Features = () => {
	return (
		<div className="bg-[url('./assets/bg/bg-2.png')] bg-cover bg-no-repeat bg-center">
			<div className="max-w-screen-2xl mx-auto py-10 px-4 md:px-6 lg:px-12 2xl:px-24">
				{/* Header */}
				<div className="flex flex-col items-center text-center">
					<h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
						Fitur Yang Tersedia <br />
						di <span className="text-teal-500">Pintar Menjaga</span>
					</h1>
					<p className="text-gray-600 text-base md:text-lg max-w-2xl mb-12 leading-relaxed">
						Dengan teknologi PintarMenjaga, setiap aset yang Anda miliki bukan
						hanya tercatat, tapi juga dianalisis dan diproyeksikan agar
						keputusan finansial jadi lebih tepat.
					</p>
				</div>

				<FeatureItem
					img={Img1}
					title="AI-Driven Asset Valuation & Forecasting"
					desc="Memanfaatkan machine learning untuk menganalisis data historis pasar, tren ekonomi, dan faktor spesifik aset (misalnya, lokasi properti, kondisi kendaraan, atau kinerja saham). Serta menghasilkan prediksi nilai aset di masa depan dengan akurasi tinggi, membantu pengguna membuat keputusan investasi yang lebih cerdas."
				/>
				<FeatureItem
					img={Img2}
					title="Verified Notary & Legal Professional Finder"
					desc="Basis data notaris dan profesional hukum yang telah terverifikasi dan terintegrasi dalam platform. Pengguna dapat mencari, membandingkan, dan menghubungi notaris berdasarkan lokasi, spesialisasi, dan ulasan dari pengguna lain."
					reverse
				/>
				<FeatureItem
					img={Img3}
					title="Multi-Asset Management Dashboard"
					desc="Satu dasbor terpadu untuk mengelola berbagai jenis aset, seperti properti, kendaraan, dan saham. Serta menyediakan tampilan holistik portofolio aset pengguna secara real-time."
				/>
				<FeatureItem
					img={Img4}
					title="Automated AI Report Generation"
					desc="AI generatif dapat membuat laporan aset yang komprehensif secara otomatis, termasuk laporan nilai, laporan historis, dan laporan performa. Pengguna cukup memasukkan data dasar, dan sistem akan menyusun laporan yang terstruktur, lengkap, dan siap digunakan untuk berbagai keperluan, seperti pengajuan pinjaman atau audit."
					reverse
				/>
			</div>
		</div>
	);
};

const FeatureItem = ({ img, title, desc, reverse }) => {
	return (
		<div
			className={`flex flex-col lg:flex-row ${
				reverse ? "lg:flex-row-reverse" : ""
			} items-center justify-between py-10`}
		>
			{/* Gambar */}
			<div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
				<div className="w-full max-w-sm aspect-[16/9] bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:scale-[1.02]">
					<img src={img} alt={title} className="w-full h-full object-cover" />
				</div>
			</div>

			{/* Teks */}
			<div
				className={`w-full lg:w-1/2 text-center lg:text-left flex flex-col gap-6 lg:gap-10 ${
					reverse ? "lg:pr-10" : "lg:pl-10"
				}`}
			>
				<h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
					{title}
				</h3>
				<p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
					{desc}
				</p>
			</div>
		</div>
	);
};

export default Features;
