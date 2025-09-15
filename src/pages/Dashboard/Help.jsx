/** @format */

"use client";

import { useState } from "react";

import {
	Book,
	ChevronDown,
	ChevronRight,
	FileText,
	HelpCircle,
	Mail,
	MessageCircle,
	Phone,
	Search,
	Users,
	Video,
} from "lucide-react";

import Layout from "../../components/shared/Layout";

const Help = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [expandedFaq, setExpandedFaq] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState("All");

	const faqCategories = [
		"All",
		"Getting Started",
		"Asset Management",
		"Reports",
		"Security",
		"Billing",
	];

	const faqs = [
		{
			id: 1,
			category: "Getting Started",
			question: "Bagaimana cara menambahkan aset pertama saya?",
			answer:
				'Untuk menambahkan aset pertama Anda, buka halaman Aset dan klik tombol "Tambah Aset". Isi informasi yang diperlukan termasuk nama aset, jenis, nilai pembelian, dan tanggal. AI kami akan otomatis mulai melacak dan menganalisis aset Anda.',
		},
		{
			id: 2,
			category: "Asset Management",
			question: "Seberapa akurat valuasi AI?",
			answer:
				"Valuasi AI kami menggunakan data pasar real-time, penjualan sebanding, dan algoritme canggih untuk memberikan estimasi yang biasanya berada dalam kisaran 5–10% dari nilai pasar sebenarnya. Namun, ini hanyalah estimasi dan sebaiknya digunakan untuk tujuan informasi.",
		},
		{
			id: 3,
			category: "Reports",
			question: "Seberapa sering laporan dihasilkan?",
			answer:
				"Laporan dapat dibuat sesuai permintaan atau dijadwalkan secara otomatis. Laporan bulanan dibuat otomatis, sementara laporan khusus dapat dibuat kapan saja. Semua laporan mencakup wawasan AI terbaru dan analisis pasar.",
		},
		{
			id: 4,
			category: "Security",
			question: "Bagaimana data keuangan saya dilindungi?",
			answer:
				"Kami menggunakan enkripsi tingkat bank (AES-256) untuk semua transmisi dan penyimpanan data. Data Anda disimpan di pusat data yang aman, sesuai standar SOC 2, dengan autentikasi multi-faktor dan audit keamanan rutin.",
		},
		{
			id: 5,
			category: "Asset Management",
			question: "Bisakah saya melacak berbagai jenis aset?",
			answer:
				"Ya! Platform kami mendukung properti, kendaraan, investasi, peralatan, perhiasan, karya seni & koleksi, serta jenis aset lainnya. Setiap jenis aset memiliki metode pelacakan dan valuasi khusus.",
		},
		{
			id: 6,
			category: "Getting Started",
			question: "Informasi apa yang saya butuhkan untuk memulai?",
			answer:
				"Anda memerlukan informasi dasar tentang aset Anda termasuk harga pembelian, tanggal diperoleh, dan lokasi saat ini. Untuk properti, detail tambahan akan membantu meningkatkan akurasi AI. Untuk investasi, laporan rekening sangat membantu.",
		},
		{
			id: 7,
			category: "Reports",
			question: "Bisakah saya menyesuaikan format laporan?",
			answer:
				"Ya, laporan dapat disesuaikan untuk mencakup aset tertentu, rentang tanggal, dan jenis analisis. Anda juga bisa memilih antara format ringkasan atau detail, serta mengekspor ke PDF atau Excel.",
		},
		//{
		//	id: 8,
		//	category: "Billing",
		//	question: "Metode pembayaran apa yang Anda terima?",
		//	answer:
		//		"Kami menerima semua kartu kredit utama, PayPal, dan transfer bank. Pelanggan perusahaan juga dapat mengatur pembayaran melalui invoice. Semua pembayaran diproses secara aman melalui gateway pembayaran terenkripsi.",
		//},
	];

	const helpResources = [
		{
			title: "Video Tutorials",
			description: "Step-by-step video guides for all features",
			icon: Video,
			color: "bg-red-50 text-red-600",
			count: "12 videos",
		},
		{
			title: "User Guide",
			description: "Comprehensive documentation and guides",
			icon: Book,
			color: "bg-blue-50 text-blue-600",
			count: "25 articles",
		},
		{
			title: "API Documentation",
			description: "Technical documentation for developers",
			icon: FileText,
			color: "bg-green-50 text-green-600",
			count: "8 endpoints",
		},
		{
			title: "Community Forum",
			description: "Connect with other users and experts",
			icon: Users,
			color: "bg-purple-50 text-purple-600",
			count: "1.2k members",
		},
	];

	const contactOptions = [
		{
			title: "Live Chat",
			description: "Get instant help from our support team",
			icon: MessageCircle,
			color: "bg-teal-50 text-teal-600",
			availability: "Available 24/7",
		},
		{
			title: "Email Support",
			description: "Send us a detailed message",
			icon: Mail,
			color: "bg-blue-50 text-blue-600",
			availability: "Response within 2 hours",
		},
		{
			title: "Phone Support",
			description: "Speak directly with our experts",
			icon: Phone,
			color: "bg-green-50 text-green-600",
			availability: "Mon-Fri 9AM-6PM EST",
		},
	];

	const filteredFaqs = faqs.filter((faq) => {
		const matchesSearch =
			faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
			faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory =
			selectedCategory === "All" || faq.category === selectedCategory;

		return matchesSearch && matchesCategory;
	});

	const toggleFaq = (id) => {
		setExpandedFaq(expandedFaq === id ? null : id);
	};

	return (
		<Layout>
			<div className="p-6 space-y-6">
				{/* Header */}
				<div className="text-center">
					<h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
					<p className="mt-2 text-gray-600">
						Find answers to your questions and get the help you need
					</p>
				</div>

				{/* Search */}
				<div className="max-w-2xl mx-auto">
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Search className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type="text"
							placeholder="Search for help articles, FAQs, or topics..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg"
						/>
					</div>
				</div>

				{/* Quick Help Resources */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{helpResources.map((resource, index) => {
						const Icon = resource.icon;
						return (
							<div
								key={index}
								className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
							>
								<div className="flex items-center space-x-4">
									<div className={`p-3 rounded-lg ${resource.color}`}>
										<Icon className="h-6 w-6" />
									</div>
									<div>
										<h3 className="font-semibold text-gray-900">
											{resource.title}
										</h3>
										<p className="text-sm text-gray-600 mt-1">
											{resource.description}
										</p>
										<p className="text-xs text-gray-500 mt-2">
											{resource.count}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* Contact Support */}
				<div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200 p-6">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						Contact Support
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{contactOptions.map((option, index) => {
							const Icon = option.icon;
							return (
								<div
									key={index}
									className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow cursor-pointer"
								>
									<div className="flex items-start space-x-3">
										<div className={`p-2 rounded-lg ${option.color}`}>
											<Icon className="h-5 w-5" />
										</div>
										<div>
											<h3 className="font-medium text-gray-900">
												{option.title}
											</h3>
											<p className="text-sm text-gray-600 mt-1">
												{option.description}
											</p>
											<p className="text-xs text-gray-500 mt-2">
												{option.availability}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* FAQ Section */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200">
					<div className="p-6 border-b border-gray-200">
						<h2 className="text-xl font-semibold text-gray-900 mb-4">
							Frequently Asked Questions
						</h2>

						{/* Category Filter */}
						<div className="flex flex-wrap gap-2">
							{faqCategories.map((category) => (
								<button
									key={category}
									onClick={() => setSelectedCategory(category)}
									className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
										selectedCategory === category
											? "bg-teal-100 text-teal-700"
											: "bg-gray-100 text-gray-600 hover:bg-gray-200"
									}`}
								>
									{category}
								</button>
							))}
						</div>
					</div>

					<div className="divide-y divide-gray-200">
						{filteredFaqs.map((faq) => (
							<div key={faq.id} className="p-6">
								<button
									onClick={() => toggleFaq(faq.id)}
									className="flex items-center justify-between w-full text-left"
								>
									<div className="flex items-start space-x-3">
										<HelpCircle className="h-5 w-5 text-teal-600 mt-0.5 flex-shrink-0" />
										<div>
											<h3 className="font-medium text-gray-900">
												{faq.question}
											</h3>
											<span className="text-xs text-gray-500 mt-1">
												{faq.category}
											</span>
										</div>
									</div>
									{expandedFaq === faq.id ? (
										<ChevronDown className="h-5 w-5 text-gray-400" />
									) : (
										<ChevronRight className="h-5 w-5 text-gray-400" />
									)}
								</button>

								{expandedFaq === faq.id && (
									<div className="mt-4 ml-8">
										<p className="text-gray-600 leading-relaxed">
											{faq.answer}
										</p>
									</div>
								)}
							</div>
						))}
					</div>
				</div>

				{/* No Results */}
				{filteredFaqs.length === 0 && (
					<div className="text-center py-12">
						<HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							No results found
						</h3>
						<p className="text-gray-600">
							Try adjusting your search terms or browse by category
						</p>
					</div>
				)}

				{/* Additional Resources */}
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						Additional Resources
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<h3 className="font-medium text-gray-900 mb-3">
								Getting Started
							</h3>
							<ul className="space-y-2 text-sm text-gray-600">
								<li>
									•{" "}
									<a href="#" className="hover:text-teal-600">
										Quick Start Guide
									</a>
								</li>
								<li>
									•{" "}
									<a href="#" className="hover:text-teal-600">
										Adding Your First Asset
									</a>
								</li>
								<li>
									•{" "}
									<a href="#" className="hover:text-teal-600">
										Understanding AI Valuations
									</a>
								</li>
								<li>
									•{" "}
									<a href="#" className="hover:text-teal-600">
										Setting Up Notifications
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-medium text-gray-900 mb-3">
								Advanced Features
							</h3>
							<ul className="space-y-2 text-sm text-gray-600">
								<li>
									•{" "}
									<a href="#" className="hover:text-teal-600">
										Custom Report Generation
									</a>
								</li>
								<li>
									•{" "}
									<a href="#" className="hover:text-teal-600">
										API Integration Guide
									</a>
								</li>
								<li>
									•{" "}
									<a href="#" className="hover:text-teal-600">
										Bulk Asset Import
									</a>
								</li>
								<li>
									•{" "}
									<a href="#" className="hover:text-teal-600">
										Advanced Analytics
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Help;
