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

// CREATE (Your version is perfect)
export async function addAsset(userUid, data) {
  const coll = collection(db, "assets");
  const payload = {
    ...data,
    ownerUid: userUid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  // Note: Your schema screenshot didn't have lastUpdated, so I'm removing it
  // to match the schema. We'll use updatedAt instead.
  const ref = await addDoc(coll, payload);
  return ref.id;
}

// READ (subscribe realtime) (Your version is perfect)
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

// READ (single) -- CORRECTED with security check
export async function getAsset(userUid, assetId) {
  const ref = doc(db, "assets", assetId);
  const snap = await getDoc(ref);

  // SECURITY: Only return the document if it exists AND the ownerUid matches.
  if (snap.exists() && snap.data().ownerUid === userUid) {
    return { id: snap.id, ...snap.data() };
  }
  return null;
}

// UPDATE (partial) -- CORRECTED with security check
export async function updateAsset(userUid, assetId, patch) {
  const ref = doc(db, "assets", assetId);

  // SECURITY: First, fetch the document to verify ownership.
  const docSnap = await getDoc(ref);
  if (!docSnap.exists() || docSnap.data().ownerUid !== userUid) {
    throw new Error("Permission denied or document not found.");
  }

  // If the check passes, proceed with the update.
  await updateDoc(ref, { ...patch, updatedAt: serverTimestamp() });
}

// DELETE -- CORRECTED with security check
export async function removeAsset(userUid, assetId) {
  const ref = doc(db, "assets", assetId);

  // SECURITY: First, fetch the document to verify ownership.
  const docSnap = await getDoc(ref);
  if (!docSnap.exists() || docSnap.data().ownerUid !== userUid) {
    throw new Error("Permission denied or document not found.");
  }

  // If the check passes, proceed with the deletion.
  await deleteDoc(ref);
}

export async function getHistoricalData(assetId) {
  const coll = collection(db, "assets", assetId, "historicalData");
  const q = query(coll, orderBy("date", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
