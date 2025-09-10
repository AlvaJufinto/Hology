/** @format */

import type { ReactNode } from 'react';

// src/PrivateRoute.tsx
import { Navigate } from 'react-router';

import { useAuth } from './context/AuthContext';

interface PrivateRouteProps {
	children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
	const { user } = useAuth();
	return user ? children : <Navigate to="/login" />;
}
