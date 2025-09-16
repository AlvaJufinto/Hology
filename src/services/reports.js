/** @format */

import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { GoogleGenerativeAI } from "@google/generative-ai"; // Import Gemini API

import { db } from "../dev/firebase";

// Fungsi untuk generate laporan menggunakan Gemini API
export async function generateReport(userUid, { type, note }) {
	const geminiApiKey = process.env.GEMINI_API_KEY; // Ambil API Key dari env
	const genAI = new GoogleGenerativeAI(geminiApiKey);
	const model = genAI.getGenerativeModel({
		model: "gemini-1.5-pro", // Model yang digunakan
		generationConfig: { responseMimeType: "text/html" }, // Format output adalah HTML
	});

	const assetsSnapshot = await db
		.collection("assets")
		.where("ownerUid", "==", userUid)
		.get();
	const assets = assetsSnapshot.docs.map((doc) => doc.data()); // Ambil data assets

	// Buat prompt untuk Gemini API
	const prompt = `
    Buat laporan portofolio dalam format HTML dengan gaya Bahasa Indonesia.
    - Jenis Laporan: ${type}
    - Catatan: ${note || "Tidak ada catatan."}
    - Data Aset: ${JSON.stringify(assets)}
  `;

	// Request ke Gemini API untuk menghasilkan laporan
	const response = await model.generateContent(prompt);
	const content = response.response.text(); // Konten HTML yang dihasilkan oleh Gemini

	// Simpan laporan ke Firestore
	const reportData = {
		title: `${type} Report`, // Judul laporan
		type,
		note,
		generatedDate: new Date().toISOString(),
		content, // HTML dari Gemini
		description: `Laporan singkat tentang ${type}`, // Deskripsi singkat dari laporan
		ownerUid: userUid,
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp(),
	};

	// Menyimpan laporan ke Firestore
	const reportRef = await addDoc(collection(db, "reports"), reportData);
	return reportRef.id; // Mengembalikan ID laporan yang baru dibuat
}
