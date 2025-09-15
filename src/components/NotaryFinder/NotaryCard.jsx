/** @format */

import { Award, Clock, Mail, MapPin, Phone, Star, Users } from "lucide-react";

import { telHref } from "../../utils";

export default function NotaryCard({ notary }) {
	return (
		<div
			key={notary.id}
			className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
		>
			{/* Header */}
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-center space-x-3">
					<div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
						<Users className="h-6 w-6 text-teal-600" />
					</div>
					<div>
						<h3 className="font-semibold text-gray-900">{notary.name}</h3>
						<div className="flex items-center text-sm text-gray-500">
							<MapPin className="h-4 w-4 mr-1" />
							{notary.location}
						</div>
					</div>
				</div>
				{notary.verified && (
					<div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
						<Award className="h-3 w-3" />
						<span>Terverifikasi</span>
					</div>
				)}
			</div>

			{/* Specialization */}
			<div className="mb-4">
				<span className="inline-block bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
					{notary.specialization}
				</span>
			</div>

			{/* Rating & Reviews */}
			<div className="flex items-center space-x-2 mb-4">
				<div className="flex items-center">
					<Star className="h-4 w-4 text-yellow-400 fill-current" />
					<span className="ml-1 text-sm font-medium text-gray-900">
						{notary.rating}
					</span>
				</div>
				<span className="text-sm text-gray-500">({notary.reviews} ulasan)</span>
			</div>

			{/* Experience & Languages */}
			<div className="space-y-2 mb-4">
				<div className="flex items-center text-sm text-gray-600">
					<Clock className="h-4 w-4 mr-2" />
					{notary.experienceYears} tahun pengalaman
				</div>
				<div className="text-sm text-gray-600">
					<span className="font-medium">Bahasa:</span>{" "}
					{notary.languages.join(", ")}
				</div>
			</div>

			{/* Availability */}
			<div className="mb-4">
				<span
					className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
						notary.availability.includes("hari ini")
							? "bg-green-100 text-green-700"
							: notary.availability.includes("besok")
							? "bg-yellow-100 text-yellow-700"
							: "bg-blue-100 text-blue-700"
					}`}
				>
					{notary.availability}
				</span>
			</div>

			{/* Contact Buttons */}
			<div className="flex space-x-2">
				<a
					href={telHref(notary.phone)}
					className="flex-1 flex items-center justify-center px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
				>
					<Phone className="h-4 w-4 mr-2" />
					Hubungi via Telepon
				</a>
				<a
					href={`mailto:${notary.email}`}
					className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
				>
					<Mail className="h-4 w-4 mr-2" />
					Kirim Email
				</a>
			</div>
		</div>
	);
}
