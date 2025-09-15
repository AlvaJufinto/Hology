/** @format */

import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { db } from "../dev/firebase";

// bikin ID stabil biar gak dobel saat klik lagi
function slug(s) {
	return String(s)
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

export async function seedAssetsFromUI(uid) {
	if (!uid) throw new Error("Harus login dulu.");

	const rows = [
		// ===== Properti / Tanah
		{
			id: `asset__${uid}__${slug("Rumah Cluster Bandung (SHM)")}`,
			data: {
				name: "Rumah Cluster Bandung (SHM)",
				type: "house",
				status: "active",
				purpose: "investment",
				currentValue: 1750000000, // ↑
				purchaseValue: 1500000000,
				iconKey: "home",
				location: "Bandung, Jawa Barat",
				lastUpdated: "2025-09-10",
				ownerUid: uid,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			},
		},
		{
			id: `asset__${uid}__${slug("Apartemen Surabaya Tower A")}`,
			data: {
				name: "Apartemen Surabaya Tower A",
				type: "house",
				status: "sold", // contoh status lain
				purpose: "wealth_transfer",
				currentValue: 650000000, // ↑
				purchaseValue: 600000000,
				iconKey: "home",
				location: "Surabaya, Jawa Timur",
				lastUpdated: "2025-08-28",
				ownerUid: uid,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			},
		},
		{
			id: `asset__${uid}__${slug("Tanah Kavling Canggu")}`,
			data: {
				name: "Tanah Kavling Canggu",
				type: "land",
				status: "active",
				currentValue: 980000000, // ↑
				purchaseValue: 800000000,
				iconKey: "land",
				location: "Badung, Bali",
				lastUpdated: "2025-09-12",
				ownerUid: uid,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			},
		},

		// ===== Saham / Surat Berharga / Obligasi
		{
			id: `asset__${uid}__${slug("Saham BBCA")}`,
			data: {
				name: "Saham BBCA",
				type: "stock",
				status: "active",
				currentValue: 120000000, // ↑
				purchaseValue: 100000000,
				iconKey: "stock",
				lastUpdated: "2025-09-12",
				ownerUid: uid,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			},
		},
		{
			id: `asset__${uid}__${slug("Saham BBRI")}`,
			data: {
				name: "Saham BBRI",
				type: "stock",
				status: "active",
				currentValue: 42000000, // ↓
				purchaseValue: 50000000,
				iconKey: "stock",
				lastUpdated: "2025-09-11",
				ownerUid: uid,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			},
		},
		{
			id: `asset__${uid}__${slug("ORI023 Kupon Tetap")}`,
			data: {
				name: "ORI023 Kupon Tetap",
				type: "bond",
				status: "active",
				currentValue: 25000000, // ≈ flat
				purchaseValue: 25000000,
				iconKey: "bond",
				location: "Kemenkeu / Mitra Distribusi",
				lastUpdated: "2025-09-01",
				ownerUid: uid,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			},
		},
		{
			id: `asset__${uid}__${slug("Reksa Dana Pasar Uang")}`,
			data: {
				name: "Reksa Dana Pasar Uang",
				type: "security",
				status: "active",
				currentValue: 12500000, // ↑ tipis
				purchaseValue: 12000000,
				iconKey: "security",
				location: "Aplikasi Investasi",
				lastUpdated: "2025-09-09",
				ownerUid: uid,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			},
		},

		// ===== Logam mulia / Kas
		{
			id: `asset__${uid}__${slug("Emas Antam 10 gram")}`,
			data: {
				name: "Emas Antam 10 gram",
				type: "gold",
				status: "active",
				currentValue: 15700000, // ↑
				purchaseValue: 13900000,
				iconKey: "gold",
				location: "Pegadaian Digital",
				lastUpdated: "2025-09-12",
				ownerUid: uid,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			},
		},
		{
			id: `asset__${uid}__${slug("Tabungan BCA")}`,
			data: {
				name: "Tabungan BCA",
				type: "cash",
				status: "active",
				currentValue: 15000000, // flat
				purchaseValue: 15000000,
				iconKey: "cash",
				lastUpdated: "2025-09-13",
				ownerUid: uid,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			},
		},

		// ===== Kendaraan
		{
			id: `asset__${uid}__${slug("Mobil MPV 2021")}`,
			data: {
				name: "Mobil MPV 2021",
				type: "vehicle",
				status: "active",
				currentValue: 210000000, // ↓ (depresiasi)
				purchaseValue: 260000000,
				iconKey: "vehicle",
				location: "Jakarta",
				lastUpdated: "2025-09-08",
				ownerUid: uid,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			},
		},
		{
			id: `asset__${uid}__${slug("Motor NMAX 2020")}`,
			data: {
				name: "Motor NMAX 2020",
				type: "vehicle",
				status: "archived",
				currentValue: 21000000, // ↓
				purchaseValue: 29000000,
				iconKey: "vehicle",
				location: "Depok",
				lastUpdated: "2025-08-20",
				ownerUid: uid,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			},
		},

		// ===== Usaha / Crypto / Lainnya
		{
			id: `asset__${uid}__${slug("Usaha Warung Kopi")}`,
			data: {
				name: "Usaha Warung Kopi",
				type: "business",
				status: "active",
				currentValue: 80000000, // ↑ (valuasi/ekuitas)
				purchaseValue: 60000000,
				iconKey: "business",
				location: "Bandung",
				lastUpdated: "2025-09-05",
				ownerUid: uid,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			},
		},
		{
			id: `asset__${uid}__${slug("Kripto BTC Spot")}`,
			data: {
				name: "Kripto BTC Spot",
				type: "crypto",
				status: "active",
				currentValue: 90000000, // ↓ (volatil)
				purchaseValue: 120000000,
				iconKey: "crypto",
				lastUpdated: "2025-09-14",
				ownerUid: uid,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			},
		},
		{
			id: `asset__${uid}__${slug("Peralatan Kerja - Laptop")}`,
			data: {
				name: "Peralatan Kerja - Laptop",
				type: "other",
				status: "inactive",
				currentValue: 9000000, // ↓ (depresiasi)
				purchaseValue: 16000000,
				iconKey: "other",
				lastUpdated: "2025-07-30",
				ownerUid: uid,
				createdAt: serverTimestamp(),
				updatedAt: serverTimestamp(),
			},
		},
	];

	// setDoc dengan ID spesifik → idempotent (klik berkali-kali tidak nambah duplikat)
	for (const row of rows) {
		await setDoc(doc(db, "assets", row.id), row.data);
	}
	return rows.length;
}
