/** @format */

import Coins from "../assets/icon/home/coins.svg";
import Growth from "../assets/icon/home/growth.svg";
import Home from "../assets/icon/home/home.svg";
import Shield from "../assets/icon/home/shield.svg";
import Navbar from "../shared/Navbar";

const Hero = () => {
	return (
		<div className="max-w-screen-2xl mx-auto">
			<Navbar />
			<div className="flex flex-col lg:flex-row items-center pb-10 px-4 md:px-6 justify-center lg:justify-between min-h-screen lg:pt-0 md:pt-28 pt-30">
				<div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-10 text-center lg:text-left mb-8 lg:mb-0">
					<h1 className="text-4xl lg:text-6xl font-bold leading-tight">
						Kelola Aset <br />
						Berhargamu <br />
						di{" "}
						<span className="text-teal-500 font-extrabold">Pintar Menjaga</span>
					</h1>

					<p className="text-base lg:text-lg text-gray-600 font-medium max-w-xl mx-auto lg:mx-0">
						Aset Anda adalah investasi masa depan. Dengan{" "}
						<span className="font-semibold text-teal-600">Pintar Menjaga</span>,
						uang, emas, properti, hingga tanah tidak hanya aman, tapi juga
						<span className="font-semibold">
							{" "}
							terus bertumbuh secara berkelanjutan
						</span>
						.
					</p>

					<p className="text-sm lg:text-base text-gray-500 max-w-lg mx-auto lg:mx-0">
						Bergabunglah bersama ribuan pengguna lain yang sudah memulai langkah
						cerdas mereka dalam mengelola aset. Saatnya Anda yang memimpin
						kendali.
					</p>

					<div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
						<button className="bg-teal-700 text-white py-3 px-8 rounded-full shadow-lg hover:bg-teal-800 hover:shadow-xl transition-all duration-300">
							Mulai Sekarang
						</button>
						<button className="border-2 border-teal-700 text-teal-700 py-3 px-8 rounded-full hover:bg-teal-50 transition-colors duration-300">
							Pelajari Lebih Lanjut
						</button>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4 lg:gap-6  lg:mt-0 w-full lg:w-1/2 max-w-md">
					<div className="w-full h-full aspect-square bg-gray-800 rounded-[3.125rem] lg:rounded-[50px] shadow-lg grid place-items-center">
						<img className="size-24" src={Coins} alt="" />
					</div>
					<div className="w-full h-full aspect-square bg-teal-500 rounded-tl-[6.25rem] lg:rounded-tl-[100px] shadow-lg grid place-items-center">
						<img className="size-24" src={Home} alt="" />
					</div>
					<div className="w-full h-full aspect-square bg-teal-500 rounded-tr-[6.25rem] lg:rounded-tr-[100px] shadow-lg grid place-items-center">
						<img className="size-24" src={Growth} alt="" />
					</div>
					<div className="w-full h-full aspect-square bg-teal-700 shadow-lg grid place-items-center">
						<img className="size-32" src={Shield} alt="" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
