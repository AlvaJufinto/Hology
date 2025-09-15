"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Phone,
  Mail,
  Filter,
  Users,
  Award,
  Clock,
} from "lucide-react";
import Layout from "./Layout";

const NotaryFinder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const notaries = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, NY",
      specialization: "Real Estate",
      rating: 4.9,
      reviews: 127,
      phone: "+1 (555) 123-4567",
      email: "sarah.johnson@notary.com",
      verified: true,
      experience: "8 years",
      languages: ["English", "Spanish"],
      availability: "Available Today",
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Los Angeles, CA",
      specialization: "Business Documents",
      rating: 4.8,
      reviews: 89,
      phone: "+1 (555) 234-5678",
      email: "michael.chen@notary.com",
      verified: true,
      experience: "12 years",
      languages: ["English", "Mandarin"],
      availability: "Available Tomorrow",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Miami, FL",
      specialization: "Legal Documents",
      rating: 4.7,
      reviews: 156,
      phone: "+1 (555) 345-6789",
      email: "emily.rodriguez@notary.com",
      verified: true,
      experience: "6 years",
      languages: ["English", "Spanish", "Portuguese"],
      availability: "Available Today",
    },
    {
      id: 4,
      name: "David Thompson",
      location: "Chicago, IL",
      specialization: "Estate Planning",
      rating: 4.9,
      reviews: 203,
      phone: "+1 (555) 456-7890",
      email: "david.thompson@notary.com",
      verified: true,
      experience: "15 years",
      languages: ["English"],
      availability: "Available This Week",
    },
    {
      id: 5,
      name: "Lisa Wang",
      location: "Seattle, WA",
      specialization: "Immigration Documents",
      rating: 4.8,
      reviews: 94,
      phone: "+1 (555) 567-8901",
      email: "lisa.wang@notary.com",
      verified: true,
      experience: "9 years",
      languages: ["English", "Mandarin", "Korean"],
      availability: "Available Today",
    },
    {
      id: 6,
      name: "Robert Martinez",
      location: "Austin, TX",
      specialization: "Real Estate",
      rating: 4.6,
      reviews: 78,
      phone: "+1 (555) 678-9012",
      email: "robert.martinez@notary.com",
      verified: true,
      experience: "7 years",
      languages: ["English", "Spanish"],
      availability: "Available Tomorrow",
    },
  ];

  const specializations = [
    "All",
    "Real Estate",
    "Business Documents",
    "Legal Documents",
    "Estate Planning",
    "Immigration Documents",
  ];
  const locations = [
    "All",
    "New York, NY",
    "Los Angeles, CA",
    "Miami, FL",
    "Chicago, IL",
    "Seattle, WA",
    "Austin, TX",
  ];

  const filteredNotaries = notaries.filter((notary) => {
    const matchesSearch =
      notary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notary.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      locationFilter === "" ||
      locationFilter === "All" ||
      notary.location === locationFilter;
    const matchesSpecialization =
      specializationFilter === "" ||
      specializationFilter === "All" ||
      notary.specialization === specializationFilter;

    return matchesSearch && matchesLocation && matchesSpecialization;
  });

  return (
    <Layout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Verified Notary Finder
            </h1>
            <p className="mt-2 text-gray-600">
              Connect with certified notaries and legal professionals
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization
                </label>
                <select
                  value={specializationFilter}
                  onChange={(e) => setSpecializationFilter(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Showing {filteredNotaries.length} of {notaries.length} verified
            notaries
          </p>
        </div>

        {/* Notaries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotaries.map((notary) => (
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
                    <h3 className="font-semibold text-gray-900">
                      {notary.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      {notary.location}
                    </div>
                  </div>
                </div>
                {notary.verified && (
                  <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                    <Award className="h-3 w-3" />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              {/* Specialization */}
              <div className="mb-4">
                <span className="inline-block bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
                  {notary.specialization}
                </span>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium text-gray-900">
                    {notary.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({notary.reviews} reviews)
                </span>
              </div>

              {/* Experience and Languages */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {notary.experience} experience
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Languages:</span>{" "}
                  {notary.languages.join(", ")}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-4">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    notary.availability.includes("Today")
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {notary.availability}
                </span>
              </div>

              {/* Contact Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </button>
                <button className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredNotaries.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No notaries found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NotaryFinder;
