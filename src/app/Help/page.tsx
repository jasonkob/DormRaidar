import React from 'react';
import Link from "next/link";
import { Menu, User, Mail, MapPin, Phone } from 'lucide-react'; // เพิ่มไอคอนที่ต้องการ

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400 rounded"></div>
          <span className="text-xl font-semibold">Radar Dorm</span>
        </div>
        
        <div className="flex items-center gap-8">
          <Link href="/" className="text-gray-600 hover:text-gray-800">Home</Link>
          <Link href="/help" className="text-gray-600 hover:text-gray-800">Help</Link>
          <Link href="/search" className="text-gray-600 hover:text-gray-800">Search</Link>
          <div className="flex items-center gap-4">
            <Menu className="w-6 h-6 text-gray-600" />
            <Link href="/login">
              <User className="w-6 h-6 text-gray-600" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Contact Information Section */}
      <div className="bg-gray-50 flex items-center justify-center p-12">
        <div className="bg-white p-8 rounded-lg shadow max-w-3xl w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-12 text-center">How can we help you?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="bg-gray-100 p-6 rounded-lg text-center flex flex-col items-center justify-center">
              <Mail className="w-8 h-8 text-gray-600 mb-4" />
              <h3 className="text-sm font-semibold text-gray-600 mb-2">EMAIL</h3>
              <p className="text-lg text-gray-800">RadarDorm@gmail.com</p>
            </div>

            {/* Our Main Office */}
            <div className="bg-gray-100 p-6 rounded-lg text-center flex flex-col items-center justify-center">
              <MapPin className="w-8 h-8 text-gray-600 mb-4" />
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Our Main Office</h3>
              <p className="text-lg text-gray-800">
                1 Chaklong Kruay 1 Alley,<br />
                Lat Krabang, Bangkok<br />
                10520
              </p>
            </div>

            {/* Phone Number */}
            <div className="bg-gray-100 p-6 rounded-lg text-center flex flex-col items-center justify-center">
              <Phone className="w-8 h-8 text-gray-600 mb-4" />
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Phone Number</h3>
              <p className="text-lg text-gray-800">1234567890</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
