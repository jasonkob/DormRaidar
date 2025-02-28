'use client';
import React from 'react';
export default function PropertyForm() {
    return (
      <div className="bg-gray-100 flex justify-center items-center min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <h1 className="text-2xl font-bold mb-4">About properties</h1>
  
          {/* Unit Information */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Unit information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Insert name" className="border p-2 rounded w-full" />
              <input type="text" placeholder="Insert room number" className="border p-2 rounded w-full" />
            </div>
            <input type="text" placeholder="Insert location" className="border p-2 rounded w-full mt-3" />
          </div>
  
          {/* Upload Images */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Unit image</h2>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {[...Array(5)].map((_, index) => (
                <label key={index} className="border-dashed border-2 border-gray-300 rounded flex flex-col items-center justify-center p-4 cursor-pointer">
                  <input type="file" className="hidden" />
                  <span className="text-gray-500 text-sm">Upload image</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">*Upload at least 4 images</p>
          </div>
  
          {/* Price */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Price</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <input type="text" placeholder="Insert cost" className="border p-2 rounded w-full" />
                <span className="ml-2 text-gray-600">/month</span>
              </div>
              <input type="text" placeholder="Insert cost" className="border p-2 rounded w-full" />
            </div>
          </div>
  
          {/* Additional Information */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Additional information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Facilities</h3>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Bed
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Desk & Chairs
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Cloth box
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Air-conditioner
                </label>
                <a href="#" className="text-blue-500 text-sm">+ Add Facilities</a>
              </div>
              <div>
                <h3 className="font-semibold">Rules</h3>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Pet-Friendly
                </label>
                <label className="block">
                  <input type="checkbox" className="mr-2" /> Cooking Allowed
                </label>
                <a href="#" className="text-blue-500 text-sm">+ Add Rules</a>
              </div>
            </div>
          </div>
  
          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button className="bg-red-400 text-white py-2 px-4 rounded">Cancel</button>
            <button className="bg-yellow-400 text-black py-2 px-4 rounded">Confirm</button>
          </div>
        </div>
      </div>
    );
  }
  