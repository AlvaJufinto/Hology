/** @format */

import type { ReactNode } from 'react';
// src/AuthContext.tsx
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
	type User,
} from 'firebase/auth';

import {
	auth,
	googleProvider,
} from '../firebase';

type AuthContextType = {
	user: User | null;
	loginWithGoogle: () => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState<User | null>(null);
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
