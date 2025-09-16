/** @format */

import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	updateDoc,
	where,
} from "firebase/firestore";

import { db } from "../dev/firebase";

// CREATE
export async function addAsset(userUid, data) {
	const coll = collection(db, "assets");
	const payload = {
		...data,
		ownerUid: userUid,
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp(),
	};
	const ref = await addDoc(coll, payload);
	return ref.id;
}

// READ (subscribe realtime)
export function subscribeAssets(userUid, cb) {
	console.log("🚀 ~ subscribeAssets ~ userUid:", userUid);
	const q = query(
		collection(db, "assets"),
		where("ownerUid", "==", userUid),
		orderBy("updatedAt", "desc")
	);
	return onSnapshot(q, (snap) => {
		const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
		cb(items);
	});
}

// READ (single asset) with error handling
export async function getAsset(userUid, assetId) {
	try {
		const ref = doc(db, "assets", assetId);
		const snap = await getDoc(ref);

		if (snap.exists() && snap.data().ownerUid === userUid) {
			return { id: snap.id, ...snap.data() };
		}
		return null;
	} catch (error) {
		console.error("Error getting asset:", error);
		throw new Error("Failed to fetch asset");
	}
}

// UPDATED: READ multiple assets with Firebase v9+
export async function getAssets(userUid) {
	if (!userUid) {
		console.error("Invalid userUid.");
		return [];
	}

	try {
		// Query to get assets owned by the user
		const q = query(collection(db, "assets"), where("ownerUid", "==", userUid));
		const querySnapshot = await getDocs(q); // Using getDocs instead of collection().get()

		// Map over the snapshot to return the asset data
		return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	} catch (error) {
		console.error("Error getting assets:", error);
		return [];
	}
}

// UPDATE (partial) with error handling
export async function updateAsset(userUid, assetId, patch) {
	try {
		const ref = doc(db, "assets", assetId);
		const docSnap = await getDoc(ref);
		if (!docSnap.exists() || docSnap.data().ownerUid !== userUid) {
			throw new Error("Permission denied or document not found.");
		}
		await updateDoc(ref, { ...patch, updatedAt: serverTimestamp() });
	} catch (error) {
		console.error("Error updating asset:", error);
		throw new Error("Failed to update asset");
	}
}

// DELETE with error handling
export async function removeAsset(userUid, assetId) {
	try {
		const ref = doc(db, "assets", assetId);
		const docSnap = await getDoc(ref);
		if (!docSnap.exists() || docSnap.data().ownerUid !== userUid) {
			throw new Error("Permission denied or document not found.");
		}
		await deleteDoc(ref);
	} catch (error) {
		console.error("Error removing asset:", error);
		throw new Error("Failed to remove asset");
	}
}

// Get Historical Data with error handling
export async function getHistoricalData(assetId) {
	try {
		const coll = collection(db, "assets", assetId, "historicalData");
		const q = query(coll, orderBy("date", "asc"));
		const snap = await getDoc(q);
		return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
	} catch (error) {
		console.error("Error getting historical data:", error);
		throw new Error("Failed to fetch historical data");
	}
}
