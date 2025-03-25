'use client'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

export default function PaymentPage() {
  // Get dormitory name from URL parameter
  const params = useParams();
  const name = params?.name ? decodeURIComponent(params.name as string) : "";
  
  // Define Dorm interface for type checking
  interface Dorm {
    name: string;
    address: string;
    image: string;
    price: number;
    floor: number;
    room: string;
    phone: string;
    location?: { lat: number; lng: number };
    convenience?: string[];
    distance_from_reference_m?: number;
  }

  // State to store dormitory information
  const [dormData, setDormData] = useState<Dorm>({
    name: "",
    address: "",
    image: "",
    price: 0,
    floor: 0,
    room: "",
    phone: ""
  });
  const [loading, setLoading] = useState(true);

  // Fetch dormitory data when component mounts
  useEffect(() => {
    const loadDormData = async () => {
      try {
        const response = await fetch("https://4m89qryq9k.execute-api.ap-southeast-1.amazonaws.com/default/getAllDorms", {
          method: "GET"
        });
        const data: Dorm[] = await response.json();

        // Find the dormitory with matching name
        const matchingDorm = data.find((dorm: Dorm) => dorm.name === name);
        
        if (matchingDorm) {
          setDormData(matchingDorm);
        } else {
          console.error("Dormitory not found");
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading dorm data:", error);
        setLoading(false);
      }
    };

    if (name) {
      loadDormData();
    }
  }, [name]);

  // Calculate entrance fee (typically double the monthly rent)
  const entranceFee = dormData.price * 2;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading dormitory information...</div>;
  }

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
                <span className="ml-2 font-semibold text-white-800">{entranceFee.toLocaleString()} บาท</span>
              </p>
              <hr className="border-gray-200" />
              <p className="font-bold text-2xl text-white-900">
                TOTAL <span className="ml-2">{entranceFee.toLocaleString()} บาท</span>
              </p>
            </div>
          </div>

          {/* Room Detail */}
          <div className="border border-gray-200 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-white-800 mb-4">Room Detail</h2>
            <div className="w-full h-40 relative rounded-lg mb-6 overflow-hidden">
              <Image
                src={dormData.image || "/roomExam1.png"}
                className="object-cover"
                alt="Room"
                fill
                priority
              />
            </div>
            <div className="space-y-2">
              <p className="font-extrabold text-lg text-white-800">{dormData.name}</p>
              <p className="text-sm text-gray-600 flex items-center">
                <span className="mr-2">📍</span> {dormData.address ? dormData.address.split(" ").slice(0, 4).join(" ") : ""}
              </p>
              <hr className="border-gray-200" />
              <div className="flex justify-between">
                <p className="text-white-700 ml-5">ชั้นห้องพัก</p>
                <p className="font-medium text-white-700 mr-5">ชั้น {dormData.floor}</p>
              </div>
              <hr className="border-gray-400" />
              <div className="flex justify-between">
                <p className="text-white-700 ml-5">เลขห้อง</p>
                <p className="font-medium text-white-700 mr-5">{dormData.room}</p>
              </div>
              <hr className="border-gray-400" />
              <div className="flex justify-between">
                <p className="text-white-700 ml-5">ค่าเช่า</p>
                <p className="font-medium text-white-700 mr-5">{dormData.price.toLocaleString()} บาท / เดือน</p>
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
              <Image 
                className="mx-auto mb-7" 
                src="/QR.png" 
                alt="QRcode" 
                width={160}
                height={120}
              />
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