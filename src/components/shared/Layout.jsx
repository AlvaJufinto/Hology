/** @format */



import { useState } from "react";

import {
	DollarSign,
	FileText,
	HelpCircle,
	Home,
	LogOut,
	Menu,
	Settings,
	Users,
	X,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Logo from "../../assets/logo/logo-3.svg";
import { useAuth } from "../../context/AuthContext";

const Layout = ({ children }) => {
	const { user, logout } = useAuth();
	console.log("🚀 ~ Layout ~ user:", user);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();

	const menuItems = [
		{ name: "Home", icon: Home, path: "/dashboard" },
		{ name: "Notary Finder", icon: Users, path: "/notary-finder" },
		{ name: "Assets", icon: DollarSign, path: "/assets" },
		{ name: "Reports", icon: FileText, path: "/reports" },
		{ name: "Help", icon: HelpCircle, path: "/help" },
	];

	const handleLogout = () => {
		// Handle logout logic here
		logout();
		navigate("/login");
	};

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Fixed Sidebar */}
			<div
				className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				} transition-transform duration-300 ease-in-out lg:translate-x-0`}
			>
				<div className="flex items-center justify-between h-24 px-6 border-b border-gray-200">
					<img src={Logo} className="w-40" alt="Logo" />
					<button
						onClick={() => setSidebarOpen(false)}
						className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
					>
						<X className="h-5 w-5" />
					</button>
				</div>

				<nav className="mt-8 px-4">
					<ul className="space-y-2">
						{menuItems.map((item) => {
							const Icon = item.icon;
							const isActive = location.pathname === item.path;
							return (
								<li key={item.name}>
									<Link
										to={item.path}
										className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
											isActive
												? "bg-teal-50 text-teal-700 border-r-2 border-teal-600"
												: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
										}`}
										onClick={() => setSidebarOpen(false)}
									>
										<Icon className="mr-3 h-5 w-5" />
										{item.name}
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				<div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
					<div className="flex items-center space-x-3 mb-4">
						<img
							src={user.photoURL}
							className="rounded-full object-cover w-8"
							alt="photo"
						/>
						<div>
							<p className="text-sm font-medium text-gray-900">
								{user.displayName}
							</p>
							<p className="text-xs text-gray-500 truncate">{user.email}</p>
						</div>
					</div>
					<div className="flex space-x-2">
						<button className="flex-1 flex items-center justify-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md">
							<Settings className="h-4 w-4 mr-2" />
							Settings
						</button>
						<button
							onClick={handleLogout}
							className="flex-1 flex items-center justify-center px-3 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md"
						>
							<LogOut className="h-4 w-4 mr-2" />
							Logout
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu button */}
			<div className="lg:hidden fixed top-4 left-4 z-40">
				<button
					onClick={() => setSidebarOpen(true)}
					className="p-2 rounded-md bg-white shadow-md text-gray-600 hover:text-gray-900"
				>
					<Menu className="h-6 w-6" />
				</button>
			</div>

			{/* Main content */}
			<div className="lg:pl-64">
				<main className="min-h-screen">{children}</main>
			</div>

			{/* Mobile overlay */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-black/20 z-40 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}
		</div>
	);
};

export default Layout;
