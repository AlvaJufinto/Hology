/** @format */

import React from "react";

import {
	Instagram,
	Linkedin,
	Mail,
	MapPin,
	Phone,
	Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";

import Logo from "../../assets/logo/logo-2.svg";

const Footer = () => {
	return (
		<footer className="bg-[#F9FFE5] bg-cover bg-no-repeat bg-center	">
			<div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-14">
				<div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-8 md:p-10">
					{/* Grid utama */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
						{/* Brand */}
						<div>
							<div className="space-y-2 mb-4">
								<img src={Logo} alt="Pintar Menjaga" className="h-10" />
								<p className="text-xl font-extrabold">
									Pintar <span className="text-teal-600">Menjaga</span>
								</p>
							</div>
							<p className="text-gray-600 text-sm leading-relaxed">
								Kelola aset berharga dengan aman dan bertumbuh. Fokus pada
								tujuanmu, biar kami yang menjaga pondasinya.
							</p>

							{/* Socials */}
							<div className="flex items-center gap-3 mt-5">
								<a
									href="#"
									className="w-9 h-9 grid place-items-center rounded-full bg-teal-100 text-teal-700 hover:bg-teal-200 transition"
								>
									<Instagram className="w-5 h-5" />
								</a>
								<a
									href="#"
									className="w-9 h-9 grid place-items-center rounded-full bg-teal-100 text-teal-700 hover:bg-teal-200 transition"
								>
									<Twitter className="w-5 h-5" />
								</a>
								<a
									href="#"
									className="w-9 h-9 grid place-items-center rounded-full bg-teal-100 text-teal-700 hover:bg-teal-200 transition"
								>
									<Linkedin className="w-5 h-5" />
								</a>
							</div>
						</div>

						{/* Navigasi */}
						<div>
							<h4 className="font-semibold text-lg mb-4">Navigasi</h4>
							<ul className="space-y-2 text-gray-700">
								<li>
									<Link className="hover:text-teal-700" to="/">
										Home
									</Link>
								</li>
								<li>
									<Link className="hover:text-teal-700" to="/features">
										Feature
									</Link>
								</li>
								<li>
									<Link className="hover:text-teal-700" to="/about">
										About Us
									</Link>
								</li>
								<li>
									<Link className="hover:text-teal-700" to="/contact">
										Contact
									</Link>
								</li>
							</ul>
						</div>

						{/* Kontak */}
						<div>
							<h4 className="font-semibold text-lg mb-4">Kontak</h4>
							<ul className="space-y-3 text-gray-700 text-sm">
								<li className="flex items-center gap-3">
									<MapPin className="w-5 h-5 text-teal-600" />
									<span>Jakarta, Indonesia</span>
								</li>
								<li className="flex items-center gap-3">
									<Mail className="w-5 h-5 text-teal-600" />
									<a
										className="hover:text-teal-700"
										href="mailto:halo@pintarmenjaga.com"
									>
										halo@pintarmenjaga.com
									</a>
								</li>
								<li className="flex items-center gap-3">
									<Phone className="w-5 h-5 text-teal-600" />
									<a className="hover:text-teal-700" href="tel:+6281234567890">
										+62 812-3456-7890
									</a>
								</li>
							</ul>
						</div>

						{/* Newsletter */}
						<div>
							<h4 className="font-semibold text-lg mb-4">Berlangganan</h4>
							<p className="text-gray-600 text-sm mb-4">
								Dapatkan tips pengelolaan aset dan info terbaru.
							</p>
							<form
								className="flex items-center gap-2"
								onSubmit={(e) => e.preventDefault()}
							>
								<input
									type="email"
									placeholder="Email kamu"
									className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
								/>
								<button
									type="submit"
									className="shrink-0 bg-teal-700 text-white px-5 py-3 rounded-xl hover:bg-teal-800 transition"
								>
									Daftar
								</button>
							</form>
						</div>
					</div>

					<hr className="my-8 border-gray-200" />

					{/* Bottom */}
					<div className="flex flex-col md:flex-row items-center justify-between gap-4">
						<p className="text-gray-600 text-sm text-center md:text-left">
							© {new Date().getFullYear()} Pintar Menjaga. All rights reserved.
						</p>
						<ul className="flex items-center gap-5 text-sm text-gray-700">
							<li>
								<Link className="hover:text-teal-700" to="/privacy">
									Privacy
								</Link>
							</li>
							<li>
								<Link className="hover:text-teal-700" to="/terms">
									Terms
								</Link>
							</li>
							<li>
								<Link className="hover:text-teal-700" to="/security">
									Security
								</Link>
							</li>
							<li>
								<Link className="hover:text-teal-700" to="/status">
									Status
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
