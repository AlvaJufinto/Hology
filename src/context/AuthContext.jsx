/** @format */
import {
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';

import {
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from 'firebase/auth';

import {
	auth,
	googleProvider,
} from '../firebase';

const AuthContext = (createContext < AuthContextType) | (undefined > undefined);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = (useState < User) | (null > null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	// 👉 Google login function
	const loginWithGoogle = async () => {
		await signInWithPopup(auth, googleProvider);
	};

	// 👉 Logout function
	const logout = async () => {
		await signOut(auth);
	};

	return (
		<AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
