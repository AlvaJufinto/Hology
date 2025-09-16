/** @format */

import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	where,
} from "firebase/firestore";

import { GoogleGenAI } from "@google/genai";

import { db } from "../dev/firebase";
import { getAssets } from "../services/assets";

// Function to create a report
export async function generateReport(userUid, { type, note, setLoading }) {
	const client = new GoogleGenAI({
		apiKey: import.meta.env.VITE_GEMINI_API_KEY,
	});

	setLoading(true); // Start loading

	try {
		const response = await client.models.generateContent({
			model: "gemini-2.5-flash",
			contents: [
				{
					role: "user",
					parts: [
						{
							text: `Buat laporan portofolio dalam format HTML dengan gaya Bahasa Indonesia dalam format yang menarik dan profesional dan muat untuk 2 halaman maksimal. Sertakan ringkasan eksekutif, analisis kinerja, alokasi aset, dan rekomendasi. Tapi tetap berpacu dengan jenis laporan. Tapi jika jenis laporan adalah semua maka tampilkan yang seharusnya ditampilkan. Kamu langsung generate HTMLnya saja tanpa perlu teks apa2 di depannya. Sertakan informasi lain seperti tanggal, judul laporan dan tanggal laporan. Cari referensi dari internet jika perlu.
							
							Gunakan data berikut:
                  Jenis Laporan: ${type}
                  Catatan: ${note || "Tidak ada catatan."}
                  Data Aset: ${JSON.stringify(await getAssets(userUid))}`,
						},
					],
				},
			],
		});
		console.log("🚀 ~ generateReport ~ response:", response);

		const htmlContent = response.text;

		const plainText = removeHtmlTags(htmlContent);
		const description = truncateText(plainText, 100);

		const reportData = {
			title: `${type} Report`,
			type,
			note,
			generatedDate: new Date().toISOString(),
			content: htmlContent,
			description,
			ownerUid: userUid,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		};

		const reportRef = await addDoc(collection(db, "reports"), reportData);

		return reportRef.id;
	} catch (error) {
		console.error("Error generating report:", error);
		throw error;
	} finally {
		setLoading(false); // End loading
	}
}

function removeHtmlTags(text) {
	return text.replace(/<\/?[^>]+(>|$)/g, "");
}

function truncateText(text, wordLimit) {
	const words = text.split(/\s+/);
	if (words.length <= wordLimit) return text;
	return words.slice(0, wordLimit).join(" ") + "...";
}

export function subscribeReports(userUid, cb) {
	const q = query(
		collection(db, "reports"),
		where("ownerUid", "==", userUid),
		orderBy("updatedAt", "desc")
	);
	console.log("🚀 ~ subscribeReports ~ q:", q);
	return onSnapshot(q, (snap) => {
		const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
		cb(items);
	});
}
