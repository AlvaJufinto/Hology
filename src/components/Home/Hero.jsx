/** @format */

import Coins from "../../assets/icon/home/coins.svg";
import Growth from "../../assets/icon/home/growth.svg";
import Home from "../../assets/icon/home/home.svg";
import Shield from "../../assets/icon/home/shield.svg";

const Hero = () => {
  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-screen pt-24 md:pt-16 sm:pt-38 pb-10 md:px-20 px-16">
      <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-10 text-center lg:text-left mb-8 lg:mb-0">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Kelola Aset <br />
          Berhargamu <br />
          di{" "}
          <span className="text-teal-500 font-extrabold">Pintar Menjaga</span>
        </h1>

        <p className="text-base md:text-lg text-gray-600 font-medium max-w-xl mx-auto lg:mx-0">
          Aset Anda adalah investasi masa depan. Dengan{" "}
          <span className="font-semibold text-teal-600">Pintar Menjaga</span>,
          uang, emas, properti, hingga tanah tidak hanya aman, tapi juga
          <span className="font-semibold">
            {" "}
            terus bertumbuh secara berkelanjutan
          </span>
          .
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <button className="w-full sm:w-auto bg-teal-700 text-white py-3 px-8 rounded-full shadow-lg hover:bg-teal-800 hover:shadow-xl transition-all duration-300">
            Mulai Sekarang
          </button>
          <button className="w-full sm:w-auto border-2 border-teal-700 text-teal-700 py-3 px-8 rounded-full hover:bg-teal-50 transition-colors duration-300">
            Pelajari Lebih Lanjut
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8 lg:mt-0 mt-8 lg:mt-0 w-full lg:w-1/2 max-w-sm sm:max-w-md">
        <div className="w-full h-full aspect-square bg-gray-800 rounded-[2rem] sm:rounded-[3.125rem] lg:rounded-[50px] shadow-lg grid place-items-center">
          <img className="size-20 sm:size-24" src={Coins} alt="Coins" />
        </div>
        <div className="w-full h-full aspect-square bg-teal-500 rounded-tl-[4rem] sm:rounded-tl-[6.25rem] lg:rounded-tl-[100px] shadow-lg grid place-items-center">
          <img className="size-20 sm:size-24" src={Home} alt="Home" />
        </div>
        <div className="w-full h-full aspect-square bg-teal-500 rounded-tr-[4rem] sm:rounded-tr-[6.25rem] lg:rounded-tr-[100px] shadow-lg grid place-items-center">
          <img className="size-20 sm:size-24" src={Growth} alt="Growth" />
        </div>
        <div className="w-full h-full aspect-square bg-teal-700 rounded-bl-[2rem] sm:rounded-bl-[3.125rem] lg:rounded-bl-[50px] shadow-lg grid place-items-center">
          <img className="size-24 sm:size-32" src={Shield} alt="Shield" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
