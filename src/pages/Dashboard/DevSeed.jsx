/** @format */

import { useEffect, useState } from "react";

import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {
	collection,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";

import { auth, db, googleProvider } from "../../dev/firebase";
import { seedAssetsFromUI } from "../../dev/seed";
import {
	ASSET_STATUS,
	ASSET_TYPE,
	formatIDR,
	getLabel,
	getTrend,
} from "../../utils";

export default function DevSeed() {
	const [user, setUser] = useState(null);
	const [assets, setAssets] = useState([]);
	const [busy, setBusy] = useState(false);

	useEffect(() => {
		const un = onAuthStateChanged(auth, (u) => {
			setUser(u || null);
			if (!u) return setAssets([]);
			const q = query(
				collection(db, "assets"),
				where("ownerUid", "==", u.uid),
				orderBy("updatedAt", "desc")
			);
			return onSnapshot(q, (snap) => {
				setAssets(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
			});
		});
		return () => un();
	}, []);

	async function handleLogin() {
		await signInWithPopup(auth, googleProvider);
	}
	async function handleLogout() {
		await signOut(auth);
	}
	async function handleSeed() {
		if (!user) return alert("Login dulu ya.");
		try {
			setBusy(true);
			const n = await seedAssetsFromUI(user.uid);
			alert(`Berhasil seeding ${n} aset.`);
		} catch (e) {
			alert(e.message || String(e));
		} finally {
			setBusy(false);
		}
	}

	return (
		<div style={{ padding: 16 }}>
			<h1>Dev • Seeding Aset</h1>

			{!user ? (
				<button
					onClick={handleLogin}
					style={{ padding: "8px 12px", marginTop: 8 }}
				>
					Login Google
				</button>
			) : (
				<div
					style={{
						display: "flex",
						gap: 8,
						alignItems: "center",
						margin: "8px 0",
					}}
				>
					<span>Hai, {user.displayName}</span>
					<button onClick={handleLogout} style={{ padding: "6px 10px" }}>
						Logout
					</button>
					<button
						onClick={handleSeed}
						disabled={busy}
						style={{ padding: "6px 10px" }}
					>
						{busy ? "Seeding..." : "Seed Aset"}
					</button>
				</div>
			)}

			<hr style={{ margin: "12px 0" }} />

			<div>
				{assets.map((a) => {
					const trend = getTrend(a.currentValue, a.purchaseValue); // "up" | "down" | "flat"
					return (
						<div
							key={a.id}
							style={{
								display: "flex",
								justifyContent: "space-between",
								padding: 8,
								border: "1px solid #e5e7eb",
								borderRadius: 8,
								marginBottom: 8,
							}}
						>
							<div>
								<div style={{ fontWeight: 600 }}>{a.name}</div>
								<div style={{ fontSize: 12, opacity: 0.7 }}>
									{getLabel(ASSET_TYPE, a.type)} •{" "}
									{getLabel(ASSET_STATUS, a.status)} • {a.location || "-"}
								</div>
							</div>
							<div
								style={{
									fontSize: 14,
									color:
										trend === "up"
											? "#16a34a"
											: trend === "down"
											? "#dc2626"
											: "inherit",
								}}
							>
								{formatIDR(a.currentValue)}
							</div>
						</div>
					);
				})}
				{!assets.length && (
					<div style={{ opacity: 0.7 }}>Belum ada aset. Klik “Seed Aset”.</div>
				)}
			</div>
		</div>
	);
}
