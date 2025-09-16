const AboutUs = () => {
  return (
    <div className="bg-[url('./assets/bg/bg-2.png')] bg-cover bg-no-repeat bg-center">
      {/* Container untuk semua konten */}
      <div className="max-w-screen-2xl mx-auto flex flex-col items-center text-center px-4 md:px-6 min-h-screen py-20">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-10">
            About <br />
            <span className="text-teal-500">Pintar Menjaga</span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mb-12">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
