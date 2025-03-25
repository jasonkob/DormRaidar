"use client";

import React from "react";

const UnitsConfirmation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              วันศุกร์ที่ 14 กุมภาพันธ์ 2024
            </h1>
            <h2 className="text-xl font-semibold text-gray-700 flex items-center">
              <span className="inline-block w-2 h-6 bg-blue-500 mr-3 rounded"></span>
              การยืนยันการจอง
            </h2>
          </div>
        </div>

        {/* Booking Confirmation Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              การยืนยันการจอง
            </h2>
            <p className="text-gray-500">รายการยืนยันการจองล่าสุด</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    ชื่อลูกค้า
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    ชื่อที่พัก
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    ห้อง
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    ราคา
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    วันที่ชำระเงิน
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    หลักฐานการชำระเงิน
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-700">Juliannat</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    หอพักบุญพนันเชิง
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">212</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                    ฿7,600
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">14/02/2024</td>
                  <td className="px-6 py-4 text-sm">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors">
                      ตรวจสอบหลักฐาน
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-700">Wouachi</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    หอพักปาปิยองกุ๊กๆ
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">212</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                    ฿7,600
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">15/02/2024</td>
                  <td className="px-6 py-4 text-sm">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors">
                      ตรวจสอบหลักฐาน
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex justify-center p-6 bg-white rounded-xl shadow-md">
          <button
            onClick={() => {
              // Clear localStorage and redirect to Home
              localStorage.removeItem("authToken");
              localStorage.removeItem("tokenExpiry");
              localStorage.removeItem("user");
              localStorage.removeItem("rememberMe");
              window.location.href = "/Home";
            }}
            className="flex flex-col items-center text-red-500 hover:text-red-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7"
              />
            </svg>
            <span className="text-sm mt-1">Log out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitsConfirmation;