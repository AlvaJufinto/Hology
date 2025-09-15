/** @format */

const Features = () => {
  return (
    <div className="bg-[url('./assets/bg/bg-2.png')] bg-cover bg-no-repeat bg-center">
      {/* Container untuk semua konten */}
      <div className="max-w-screen-2xl mx-auto py-10 px-4 md:px-6 lg:px-12 2xl:px-24">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Fitur Yang Tersedia <br />
            di <span className="text-teal-500">Pintar Menjaga</span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mb-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aset Anda
            tetap aman sekaligus bertumbuh bersama teknologi yang cerdas.
          </p>
        </div>
        {/* Fitur 1 */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-10">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mb-8 lg:mb-0">
            <div className="w-full max-w-sm h-64 sm:h-80 md:h-96 bg-white rounded-lg shadow-md">
              {/* This is the white box, now with a responsive size */}
            </div>
          </div>
          <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col gap-6 lg:gap-10 lg:pl-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
              AI-Driven Asset Valuation & Forecasting
            </h3>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto lg:mx-0">
              Memanfaatkan machine learning untuk menganalisis data historis
              pasar, tren ekonomi, dan faktor spesifik aset (misalnya, lokasi
              properti, kondisi kendaraan, atau kinerja saham). Serta
              menghasilkan prediksi nilai aset di masa depan dengan akurasi
              tinggi, membantu pengguna membuat keputusan investasi yang lebih
              cerdas.
            </p>
          </div>
        </div>

        {/* --- */}

        {/* Fitur 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between py-10">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-8 lg:mb-0">
            <div className="w-full max-w-sm h-64 sm:h-80 md:h-96 bg-white rounded-lg shadow-md">
              {/* This is the white box, now with a responsive size */}
            </div>
          </div>
          <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col gap-6 lg:gap-10 lg:pr-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
              Verified Notary & Legal Professional Finder
            </h3>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto lg:mx-0">
              Basis data notaris dan profesional hukum yang telah terverifikasi
              dan terintegrasi dalam platform dan pengguna dapat mencari,
              membandingkan, dan menghubungi notaris berdasarkan lokasi,
              spesialisasi, dan ulasan dari pengguna lain.
            </p>
          </div>
        </div>

        {/* --- */}

        {/* Fitur 3 */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-10">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start mb-8 lg:mb-0">
            <div className="w-full max-w-sm h-64 sm:h-80 md:h-96 bg-white rounded-lg shadow-md">
              {/* This is the white box, now with a responsive size */}
            </div>
          </div>
          <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col gap-6 lg:gap-10 lg:pl-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
              Multi-Asset Management Dashboard
            </h3>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto lg:mx-0">
              Satu dasbor terpadu untuk mengelola berbagai jenis aset, seperti
              properti, kendaraan, dan saham. Serta enyediakan tampilan holistik
              portofolio aset pengguna secara real-time.
            </p>
          </div>
        </div>

        {/* --- */}

        {/* Fitur 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between py-10">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mb-8 lg:mb-0">
            <div className="w-full max-w-sm h-64 sm:h-80 md:h-96 bg-white rounded-lg shadow-md">
              {/* This is the white box, now with a responsive size */}
            </div>
          </div>
          <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col gap-6 lg:gap-10 lg:pr-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
              Automated AI Report Generation
            </h3>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto lg:mx-0">
              AI generatif dapat membuat laporan aset yang komprehensif secara
              otomatis, termasuk laporan nilai, laporan historis, dan laporan
              performa. Pengguna cukup memasukkan data dasar, dan sistem akan
              menyusun laporan yang terstruktur, lengkap, dan siap digunakan
              untuk berbagai keperluan, seperti pengajuan pinjaman atau audit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
