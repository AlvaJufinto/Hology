import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start pb-10 px-4 md:px-6 justify-center lg:justify-between min-h-screen lg:pt-40 md:pt-28 pt-30">
      <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-10 text-center lg:text-left mb-8 lg:mb-0">
        <p className="text-4xl lg:text-6xl font-bold leading-tight">
          Kelola Aset
          <br /> Berhargamu
          <br />
          <span className="text-teal-500">di Pintar Menjaga</span>
        </p>
        <p className="text-base lg:text-xl font-semibold">
          Uang, emas, properti, tanah, dikelola dan bertumbuh dengan aman
        </p>
        <button className="bg-teal-700 text-white py-3 px-6 rounded-full w-fit mx-auto lg:mx-0 hover:bg-teal-800 transition">
          Discover More
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:gap-6 mt-6 lg:mt-0 w-full lg:w-1/2 max-w-md">
        <div className="w-full h-full aspect-square bg-gray-800 rounded-[3.125rem] lg:rounded-[50px] shadow-lg"></div>
        <div className="w-full h-full aspect-square bg-teal-500 rounded-tl-[6.25rem] lg:rounded-tl-[100px] shadow-lg"></div>
        <div className="w-full h-full aspect-square bg-teal-500 rounded-tr-[6.25rem] lg:rounded-tr-[100px] shadow-lg"></div>
        <div className="w-full h-full aspect-square bg-teal-700 shadow-lg"></div>
      </div>
    </div>
  );
};

export default Hero;