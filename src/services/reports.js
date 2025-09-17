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
export async function generateReport(userUid, setLoading, documentDetail) {
	const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

	setLoading(true);

	const prompt = `Buat laporan portofolio dalam format markdown dengan gaya Bahasa Indonesia dalam format yang menarik dan profesional dan muat untuk 2 halaman maksimal. Sertakan ringkasan eksekutif, analisis kinerja, alokasi aset, dan rekomendasi. Tapi tetap berpacu dengan jenis laporan. Kamu langsung generate HTMLnya saja tanpa perlu teks apa2 di depannya. Sertakan informasi lain seperti tanggal, judul laporan dan tanggal laporan. Cari referensi dari internet jika perlu. return dengan object dengan 2 attribute yaitu content dan description. Description itu ringkasan singkat sekitar 100 kata pertama. Content itu adalah isi laporan dalam format HTML.
							
							Gunakan data berikut:
                  Jenis Laporan: ${documentDetail.type}
                  Catatan: ${documentDetail.description || "Tidak ada catatan."}
									Gunakan chart: ${documentDetail.includeCharts ? "Ya" : "Tidak"}
									Gunakan AI forecasting: ${documentDetail.includeForecasting ? "Ya" : "Tidak"}
									Gunakan market comparison: ${documentDetail.includeComparison ? "Ya" : "Tidak"}
                  Data Aset: ${JSON.stringify(await getAssets(userUid))}`;

	try {
		const response = await ai.models.generateContent({
			contents: prompt,
			model: "gemini-1.5-flash",
			config: {
				candidateCount: 1,
				maxOutputTokens: 2500,
				temperature: 1.0,
			},
		});

		console.log("🚀 ~ generateReport ~ response:", response);

		const rawText = await response?.candidates?.[0]?.content?.parts[0]?.text;

		const fenceMatch = rawText.match(/```[a-zA-Z]*\n([\s\S]*?)```/);
		const jsonString = (fenceMatch ? fenceMatch[1] : rawText).trim();

		const cleanedJson = jsonString.replace(/^\uFEFF/, "");
		console.log("🚀 ~ generateReport ~ cleanedJson:", cleanedJson);
		let data;
		try {
			data = JSON.parse(cleanedJson);
		} catch (e) {
			console.error("Gagal JSON.parse:", e, { cleanedJson });
			alert("JSON dari model tidak valid.");
			setLoading(false);
			return;
		}

		if (data) {
			const { description, content } = data;

			const reportData = {
				title: documentDetail.title,
				type: documentDetail.type,
				content,
				description,
				ownerUid: userUid,
				generatedDate: serverTimestamp(),
				createdAt: serverTimestamp(),
			};

			await addDoc(collection(db, "reports"), reportData);
			setLoading(false);
		}

		//return reportRef.id;
	} catch (error) {
		console.error("Error generating report:", error);
		throw error;
	} finally {
		setLoading(false); // End loading
	}
}
export function subscribeReports(userUid, cb) {
	const q = query(
		collection(db, "reports"),
		where("ownerUid", "==", userUid),
		orderBy("createdAt", "desc")
	);

	return onSnapshot(q, (snap) => {
		const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
		cb(items);
	});
}
