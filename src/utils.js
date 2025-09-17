/** @format */

import {
	BadgeDollarSign,
	Briefcase,
	Building2,
	Car,
	Coins,
	FileText,
	Gem,
	Home,
	Landmark,
	LineChart,
	Wallet,
} from "lucide-react";

export const formatIDR = (value) => {
	if (isNaN(value)) return "-";
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0,
	}).format(value);
};

export const telHref = (phone) => `tel:${phone.replace(/\s+/g, "")}`;

// ASSET UTILS

export const ASSET_TYPE = {
	land: { key: "land", label: "Tanah", iconKey: "land" },
	house: { key: "house", label: "Rumah", iconKey: "home" },
	security: { key: "security", label: "Surat Berharga", iconKey: "security" },
	stock: { key: "stock", label: "Saham", iconKey: "stock" },
	bond: { key: "bond", label: "Obligasi", iconKey: "bond" },
	vehicle: { key: "vehicle", label: "Kendaraan", iconKey: "vehicle" },
	gold: { key: "gold", label: "Emas", iconKey: "gold" },
	cash: { key: "cash", label: "Kas", iconKey: "cash" },
	business: { key: "business", label: "Usaha", iconKey: "business" },
	crypto: { key: "crypto", label: "Kripto", iconKey: "crypto" },
	other: { key: "other", label: "Lainnya", iconKey: "other" },
};

export const ASSET_PURPOSE = {
	investment: { key: "investment", label: "Investasi" },
	wealth_transfer: { key: "wealth_transfer", label: "Alih Kekayaan" },
	emergency: { key: "emergency", label: "Dana Darurat" },
	retirement: { key: "retirement", label: "Pensiun" },
	education: { key: "education", label: "Pendidikan" },
	consumption: { key: "consumption", label: "Konsumsi" },
	other: { key: "other", label: "Lainnya" },
};

export const ASSET_STATUS = {
	active: { key: "active", label: "Aktif" },
	inactive: { key: "inactive", label: "Nonaktif" },
	sold: { key: "sold", label: "Terjual" },
	archived: { key: "archived", label: "Arsip" },
};

export const ICONS = {
	home: Home,
	land: Landmark,
	stock: LineChart,
	bond: BadgeDollarSign,
	security: FileText,
	vehicle: Car,
	gold: Gem,
	cash: Wallet,
	business: Briefcase,
	crypto: Coins,
	other: Building2,
};

// END ASSET UTILS

// fallback ikon kalau field iconKey kosong → bisa pilih default berdasar tipe
export function pickIcon(iconKey, fallback = "other") {
	return ICONS[iconKey] || ICONS[fallback] || ICONS.other;
}

export function getTrend(currentValue, purchaseValue) {
	// if (typeof currentValue !== "number" || typeof purchaseValue !== "number")
	// 	return "flat";
	if (currentValue > purchaseValue) return "up";
	if (currentValue < purchaseValue) return "down";
	// return "flat";
}

// ===== Helper umum
export function toOptions(mapObj) {
	return Object.values(mapObj).map((v) => ({ value: v.key, label: v.label }));
}
export function getLabel(mapObj, key) {
	return mapObj[key]?.label || key || "-";
}
export const ASSET_TYPE_OPTIONS = toOptions(ASSET_TYPE);
export const ASSET_PURPOSE_OPTIONS = toOptions(ASSET_PURPOSE);
export const ASSET_STATUS_OPTIONS = toOptions(ASSET_STATUS);

export const formatIndoDate = (iso) =>
	new Date(iso).toLocaleDateString("id-ID", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	});

export const REPORT_TYPE = {
	semua: { key: "semua", label: "Semua", iconKey: "folder" },
	kinerja: { key: "kinerja", label: "Kinerja", iconKey: "bar-chart" },
	penilaian: { key: "penilaian", label: "Penilaian", iconKey: "clipboard" },
	pajak: { key: "pajak", label: "Pajak", iconKey: "calculator" },
	risiko: { key: "risiko", label: "Risiko", iconKey: "shield" },
	pembaruan: { key: "pembaruan", label: "Pembaruan", iconKey: "refresh-ccw" },
	asuransi: { key: "asuransi", label: "Asuransi", iconKey: "umbrella" },
};

export function estimateHtmlSizeMB(html, decimals = 2) {
	if (typeof html !== "string") {
		throw new TypeError("Input harus string HTML.");
	}
	const bytes = new TextEncoder().encode(html).length;
	const MB = 1024 * 1024;
	return Number((bytes / MB).toFixed(decimals));
}
