import React from 'react';
import Link from "next/link";
import { Menu, User } from 'lucide-react';

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
              <div className="w-12 h-12 mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">EMAIL</h3>
              <p className="text-lg text-gray-800">RaderDorm@gmail.com</p>
            </div>

            {/* Our Main Office */}
            <div className="bg-gray-100 p-6 rounded-lg text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Our Main Office</h3>
              <p className="text-lg text-gray-800">
                1 Chaklong Kruay 1 Alley,<br />
                Lat Krabang, Bangkok<br />
                10520
              </p>
            </div>

            {/* Phone Number */}
            <div className="bg-gray-100 p-6 rounded-lg text-center flex flex-col items-center justify-center">
              <div className="w-12 h-12 mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-gray-600 mb-2">Phone Number</h3>
              <p className="text-lg text-gray-800">00X-XXX-XXXX</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}