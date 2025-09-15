/** @format */

import Features from "../components/Home/Features";
import Hero from "../components/Home/Hero";
import Footer from "../components/shared/Footer";

export default function Home() {
	return (
		<>
			<div className="bg-[url('./assets/bg/bg-1.png')] bg-cover bg-no-repeat bg-center">
				<Hero />
			</div>
			<Features />
			<Footer />
		</>
	);
}
