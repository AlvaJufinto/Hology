/** @format */

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Logo from "../assets/logo/logo-3.svg";
import { useAuth } from "../context/AuthContext";

export default function Login() {
	const { loginWithGoogle } = useAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [errMsg, setErrMsg] = useState("");

	const handleGoogleLogin = async () => {
		setErrMsg("");
		setLoading(true);
		try {
			await loginWithGoogle();
			navigate("/dashboard");
		} catch (err) {
			console.error(err);
			setErrMsg("Gagal masuk. Coba lagi ya.");
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-[url('./assets/bg/bg-2.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center px-4">
			<div className="w-full max-w-md ">
				{/* Card */}
				<div className="rounded-2xl shadow-xl bg-white ring-1 ring-gray-200 p-6 md:p-7">
					<img src={Logo} className="mx-auto w-56 mb-6" alt="logo" />

					<h2 className="text-xl font-semibold mb-2">Masuk ke akun</h2>
					<p className="text-sm text-gray-600 mb-6">
						Lanjutkan dengan Google untuk mulai mengelola asetmu.
					</p>

					{errMsg ? (
						<div
							role="status"
							className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
						>
							{errMsg}
						</div>
					) : null}

					<button
						type="button"
						onClick={handleGoogleLogin}
						disabled={loading}
						className="cursor-pointer w-full inline-flex items-center justify-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ring-1 ring-gray-200 hover:ring-gray-300 bg-white hover:bg-gray-50 transition disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
						aria-busy={loading ? "true" : "false"}
					>
						<img
							src="https://www.svgrepo.com/show/475656/google-color.svg"
							alt=""
							className="h-5 w-5"
						/>
						{loading ? "Memproses..." : "Masuk dengan Google"}
					</button>

					{/*<div className="flex items-center gap-4 my-6">
						<div className="h-px flex-1 bg-gray-200" />
						<span className="text-xs uppercase tracking-wider text-gray-500">
							atau
						</span>
						<div className="h-px flex-1 bg-gray-200" />
					</div>*/}

					<ul className="mt-6 space-y-2 text-sm text-gray-600">
						<li className="flex items-start gap-2">
							<span className="mt-1 h-2 w-2 rounded-full bg-teal-500" />
							Akses aman & cepat via Google OAuth.
						</li>
						<li className="flex items-start gap-2">
							<span className="mt-1 h-2 w-2 rounded-full bg-teal-500" />
							Data terenkripsi, tetap privat di perangkatmu.
						</li>
						<li className="flex items-start gap-2">
							<span className="mt-1 h-2 w-2 rounded-full bg-teal-500" />
							Sinkron dengan dashboard asetmu.
						</li>
					</ul>

					<p className="mt-6 text-xs text-gray-500 leading-relaxed">
						Dengan masuk, kamu menyetujui{" "}
						<a
							href="/terms"
							className="underline decoration-teal-400 underline-offset-2 hover:text-teal-600"
						>
							Syarat
						</a>{" "}
						&{" "}
						<a
							href="/privacy"
							className="underline decoration-teal-400 underline-offset-2 hover:text-teal-600"
						>
							Kebijakan Privasi
						</a>
						.
					</p>
				</div>

				<p className="mt-6 text-center text-xs text-gray-500">
					© {new Date().getFullYear()} Pintar Menjaga
				</p>
			</div>
		</div>
	);
}
