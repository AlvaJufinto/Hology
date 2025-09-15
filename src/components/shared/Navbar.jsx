/** @format */

import React, { useState } from "react";

import { Link } from "react-router";

import Logo from "../../assets/logo/logo.svg";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="w-full fixed top-0 left-0 py-2 z-50 lg:px-14 px-4">
			<div className="max-w-screen-2xl mx-auto p-6  bg-teal-500 flex justify-between items-center rounded-xl">
				<div className="flex items-center gap-4">
					<img src={Logo} alt="Logo" className="h-10 w-auto" />
				</div>
				<div className="hidden md:flex items-center gap-4 lg:gap-10 text-white font-semibold">
					<Link to="/">Home</Link>
					<Link>Feature</Link>
					<Link>About Us</Link>
					<Link className="bg-teal-700 px-5 py-2 rounded-lg">Sign In</Link>
				</div>
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="md:hidden p-2 text-white focus:outline-none"
				>
					<svg
						className="w-8 h-8"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
						></path>
					</svg>
				</button>
			</div>
			<div
				className={`bg-teal-500 rounded-xl mt-2 flex flex-col items-center py-4 text-white font-semibold transition-all duration-300 ease-in-out overflow-hidden md:hidden ${
					isOpen ? "max-h-screen" : "max-h-0"
				}`}
			>
				<ul className="flex flex-col items-center w-full">
					<li className="p-2 w-full text-center">L1</li>
					<li className="p-2 w-full text-center">Feature</li>
					<li className="p-2 w-full text-center">About Us</li>
					<li className="p-2 w-full text-center">Sign-In</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
