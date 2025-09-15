/** @format */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

import { auth, googleProvider } from "../dev/firebase";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const loginWithGoogle = async () => {
		await signInWithPopup(auth, googleProvider);
	};

	const logout = async () => {
		await signOut(auth);
	};

	const value = useMemo(() => ({ user, loginWithGoogle, logout }), [user]);

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
	return ctx;
};
