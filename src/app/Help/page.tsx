import React from 'react';
import Link from "next/link";
import Image from 'next/image';
import { Search, Menu, User } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400"></div>
          <span className="text-xl font-semibold">Radar Dorm</span>
        </div>
        
        <div className="flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-gray-900">Home</Link>
          <a href="#" className="text-gray-700 hover:text-gray-900">Booked</a>
          <Link href="/Help" className="text-gray-700 hover:text-gray-900">Help</Link>
          <div className="flex items-center gap-4">
            <Menu className="w-6 h-6 text-gray-700" />
            <User className="w-6 h-6 text-gray-700" />
          </div>
        </div>
      </nav>


      {/* Contact Information Section */}
      <div className="bg-gray-50 flex items-center justify-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">How can we help you?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="bg-gray-100 p-6 rounded-lg text-center">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">EMAIL</h3>
              <p className="text-lg text-gray-800">RaderDorm@gmail.com</p>
            </div>

            {/* Our Main Office */}
            <div className="bg-gray-100 p-6 rounded-lg text-center">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Our Main Office</h3>
              <p className="text-lg text-gray-800">
                1 Cheung Kruay 1 Alley,<br />
                Last Knizepa, Bangkok<br />
                10520
              </p>
            </div>

            {/* Phone Number */}
            <div className="bg-gray-100 p-6 rounded-lg text-center">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Phone Number</h3>
              <p className="text-lg text-gray-800">00X-00X-00XX</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}