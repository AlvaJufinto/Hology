/** @format */

import { useNavigate } from "react-router";

import { useAuth } from "../context/AuthContext";

export default function Login() {
	const { loginWithGoogle } = useAuth();
	const navigate = useNavigate();

	const handleGoogleLogin = async () => {
		try {
			await loginWithGoogle();
			navigate("/dashboard");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<button onClick={handleGoogleLogin}>Login with Google</button>
		</div>
	);
}
