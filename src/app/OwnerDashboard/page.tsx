import React from 'react';

const UnitsConfirmation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">วันศุกร์ที่ 14 กุมภาพันธ์ 2024</h1>
            <h2 className="text-xl font-semibold text-gray-700 flex items-center">
              <span className="inline-block w-2 h-6 bg-blue-500 mr-3 rounded"></span>
              การยืนยันการจอง
            </h2>
          </div>
        </div>

        {/* Booking Confirmation Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">การยืนยันการจอง</h2>
            <p className="text-gray-500">รายการยืนยันการจองล่าสุด</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ชื่อลูกค้า</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ชื่อที่พัก</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ห้อง</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ราคา</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">วันที่ชำระเงิน</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">หลักฐานการชำระเงิน</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-700">Juliannat</td>
                  <td className="px-6 py-4 text-sm text-gray-700">หอพักบุญพนันเชิง</td>
                  <td className="px-6 py-4 text-sm text-gray-700">212</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">฿7,600</td>
                  <td className="px-6 py-4 text-sm text-gray-700">14/02/2024</td>
                  <td className="px-6 py-4 text-sm">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors">
                      ตรวจสอบหลักฐาน
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-700">Wouachi</td>
                  <td className="px-6 py-4 text-sm text-gray-700">หอพักปาปิยองกุ๊กๆ</td>
                  <td className="px-6 py-4 text-sm text-gray-700">212</td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">฿7,600</td>
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

        {/* Search & Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 md:mb-0">ค้นหาและกรองข้อมูล</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="ค้นหาห้องพัก" 
                  className="w-full sm:w-64 border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                ตัวกรอง
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* My Units Section with Title */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="inline-block w-2 h-6 bg-blue-500 mr-3 rounded"></span>
              <h2 className="text-xl font-semibold text-gray-800">ห้องพักของฉัน</h2>
            </div>
            <a href="#" className="text-blue-500 hover:text-blue-700 flex items-center transition-colors">
              ดูทั้งหมด
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Responsive Room Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Room Card 1 - Reserved */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="h-56 bg-gray-200 w-full">
                <svg className="w-full h-full text-gray-300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">จองแล้ว</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-1">หอพักบุญพนันเชิง</h3>
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                ซอยเกกีงาม 3
              </div>
              <div className="flex justify-between items-center">
                <span className="text-red-500 font-medium">ห้อง 311</span>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm transition-colors">
                  ดูรายละเอียด
                </button>
              </div>
            </div>
          </div>

          {/* Room Card 2 - Available */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="h-56 bg-gray-200 w-full">
                <svg className="w-full h-full text-gray-300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">ว่าง</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-1">หอพักปาปิยองกุ๊กๆ</h3>
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                ซอยเกกีงาม 3
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-500 font-medium">ห้อง 312</span>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors">
                  จองตอนนี้
                </button>
              </div>
            </div>
          </div>

          {/* Room Card 3 - Available */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="h-56 bg-gray-200 w-full">
                <svg className="w-full h-full text-gray-300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512">
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">ว่าง</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-1">หอพักโซเดมาคอม</h3>
              <div className="flex items-center text-gray-500 text-sm mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                ซอยเกกีงาม 3
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-500 font-medium">ห้อง 212</span>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors">
                  จองตอนนี้
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex justify-center space-x-8 p-6 bg-white rounded-xl shadow-md">
          <a href="#" className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7m-14 0l2 2m0 0l7 7 7-7m-14 0l2-2" />
            </svg>
            <span className="text-sm mt-1">หน้าหลัก</span>
          </a>
          <a href="#" className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm mt-1">ค้นหา</span>
          </a>
          <a href="#" className="flex flex-col items-center text-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm mt-1">การจอง</span>
          </a>
          <a href="#" className="flex flex-col items-center text-gray-600 hover:text-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-sm mt-1">โปรไฟล์</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UnitsConfirmation;