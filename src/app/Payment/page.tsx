import Link from "next/link";
import { useState } from "react";

export default function PaymentPage() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Section: Price Detail and Room Detail */}
        <div className="space-y-6">
          {/* Price Detail */}
          <div className="border border-gray-200 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-white-800 mb-4">Price Detail</h2>
            <div className="space-y-3">
              <p className="text-white-600">
                ค่าแรกเข้า (รวมค่าประกัน)
                <span className="ml-2 font-semibold text-white-800">7,600 บาท</span>
              </p>
              <hr className="border-gray-200" />
              <p className="font-bold text-2xl text-white-900">
                TOTAL <span className="ml-2">7,600 บาท</span>
              </p>
            </div>
          </div>

          {/* Room Detail */}
          <div className="border border-gray-200 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-white-800 mb-4">Room Detail</h2>
            <img
              src="https://i.pinimg.com/736x/2b/c1/d8/2bc1d89b1c73075d086b9b0dd7f48e1b.jpg"
              className="w-full h-40 rounded-lg mb-6 object-cover"
              alt="Room"
            />
            <div className="space-y-2">
              <p className="font-extrabold text-lg text-white-800">หอพักนักศึกษาอร่ามศรี</p>
              <p className="text-sm text-gray-600 flex items-center">
                <span className="mr-2">📍</span> ซอยเกกีงาม 3
              </p>
              <hr className="border-gray-200" />
              <div className="flex justify-between">
                <p className="text-white-700 ml-5">ชั้นห้องพัก</p>
                <p className="font-medium text-white-700 mr-5">ชั้น 3</p>
              </div>
              <hr className="border-gray-400" />
              <div className="flex justify-between">
                <p className="text-white-700 ml-5">เลขห้อง</p>
                <p className="font-medium text-white-700 mr-5">311</p>
              </div>
              <hr className="border-gray-400" />
              <div className="flex justify-between">
                <p className="text-white-700 ml-5">ค่าเช่า</p>
                <p className="font-medium text-white-700 mr-5">3,800 บาท / เดือน</p>
              </div>
              <hr className="border-gray-400" />
              <div className="flex justify-between">
                <p className="text-white-700 ml-5">ค่าไฟ</p>
                <p className="font-medium text-white-700 mr-5">8 บาท / หน่วย</p>
              </div>
              <hr className="border-gray-400" />
              <div className="flex justify-between">
                <p className="text-white-700 ml-5">ค่าน้ำ</p>
                <p className="font-medium text-white-700 mr-5">18 บาท / หน่วย</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Payment Method */}
        <div className="border border-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-white-800 mb-4">Payment Method</h2>
          <div className="space-y-4">
            {/* Bank Transfer */}
            <div className="flex justify-between">
              <p className="text-white-700 font-medium ml-10">ธนาคาร</p>
              <p className="text-white-700 font-medium mr-10">กสิกรไทย</p>
            </div>
            <div className="flex justify-between">
              <p className="text-white-700 font-medium ml-10">เลขบัญชี</p>
              <p className="text-white-700 font-medium mr-10">6662132015</p>
            </div>
            <div className="flex items-center justify-center my-4">
              <hr className="w-1/4 border-gray-300" />
              <span className="mx-4 text-white-500">or</span>
              <hr className="w-1/4 border-gray-300" />
            </div>
            {/* QR Code */}
            <div className="flex justify-center">
              <img className="w-40 h-30 mx-auto mb-7" src="/QR.png" alt="QRcode" />
            </div>
            {/* Upload Slip */}
            <div className="mt-6">
              <p className="text-700 font-medium mb-2">แนบรูปหลักฐานการโอนเงิน</p>
              <label
                htmlFor="file-upload"
                className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors duration-300 block min-h-[120px] flex items-center justify-center"
              >
                <p className="text-gray-500">Upload image</p>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
            {/* Phone Number */}
            <div>
              <p className="text-white-700 font-medium my-2">เบอร์โทรศัพท์</p>
              <input
                type="text"
                placeholder="Insert phone number"
                className="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Submit Button */}
            <button className="w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-300">
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}