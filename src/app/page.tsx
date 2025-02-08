import React from 'react';
import { Search, Menu, User } from 'lucide-react';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-yellow-400"></div>
          <span className="text-xl font-semibold">Radar Dorm</span>
        </div>
        
        <div className="flex items-center gap-8">
          <a href="#" className="text-gray-700 hover:text-gray-900">Home</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Booked</a>
          <a href="#" className="text-gray-700 hover:text-gray-900">Help</a>
          <div className="flex items-center gap-4">
            <Menu className="w-6 h-6 text-gray-700" />
            <User className="w-6 h-6 text-gray-700" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src="/api/placeholder/1200/800"
            alt="Dorm room"
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative px-6 py-32">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl font-bold mb-4">
              Discover your perfect dorm —
            </h1>
            <p className="text-xl mb-8">
              your smart choice for a comfortable and connected student life!
            </p>

            {/* Search Form */}
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-2xl mx-auto flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-700 text-sm mb-2">Location</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-2 border rounded-md appearance-none text-gray-700">
                    <option>Select location</option>
                  </select>
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-gray-700 text-sm mb-2">Price</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-2 border rounded-md appearance-none text-gray-700">
                    <option>Filter by price</option>
                  </select>
                </div>
              </div>

              <div className="flex items-end">
                <button className="px-8 py-2 bg-yellow-400 text-gray-800 rounded-md font-medium hover:bg-yellow-500 transition-colors">
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;