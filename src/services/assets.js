/** @format */

import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
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
		lastUpdated: serverTimestamp(),
	};
	const ref = await addDoc(coll, payload);
	return ref.id;
}

// READ (subscribe realtime)
export function subscribeAssets(userUid, cb) {
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

// READ (single)
export async function getAsset(id) {
	const ref = doc(db, "assets", id);
	const snap = await getDoc(ref);
	return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// UPDATE (partial)
export async function updateAsset(id, patch) {
	const ref = doc(db, "assets", id);
	await updateDoc(ref, { ...patch, updatedAt: serverTimestamp() });
}

// DELETE
export async function removeAsset(id) {
	await deleteDoc(doc(db, "assets", id));
}
