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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<{
    isSubmitting: boolean; 
    message: string;
    isError: boolean;
  }>({
    isSubmitting: false,
    message: "",
    isError: false
  });
  const [userId, setUserId] = useState<string>("");

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

    // Try to get userId from localStorage
    const getUserId = () => {
      try {
        const userJSON = localStorage.getItem("user");
        if (userJSON) {
          const userData = JSON.parse(userJSON);
          setUserId(userData.id);
        }
      } catch (error) {
        console.error("Error getting user ID:", error);
      }
    };

    if (name) {
      loadDormData();
      getUserId();
    }
  }, [name]);

  // Calculate entrance fee (typically double the monthly rent)
  const entranceFee = dormData.price * 2;

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validImageTypes.includes(file.type)) {
      setPaymentStatus({
        isSubmitting: false,
        message: "กรุณาอัปโหลดไฟล์รูปภาพเท่านั้น (JPEG, PNG, GIF)",
        isError: true
      });
      return;
    }

    // Create preview and convert to base64 for API
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!imagePreview) {
      setPaymentStatus({
        isSubmitting: false,
        message: "กรุณาอัปโหลดรูปหลักฐานการโอนเงิน",
        isError: true
      });
      return;
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      setPaymentStatus({
        isSubmitting: false,
        message: "กรุณาระบุเบอร์โทรศัพท์ที่ถูกต้อง",
        isError: true
      });
      return;
    }

    // Start submission
    setPaymentStatus({
      isSubmitting: true,
      message: "กำลังบันทึกข้อมูลการชำระเงิน...",
      isError: false
    });

    try {
      console.log("Starting payment upload process...");
      
      // Prepare payload for API with exact structure required
      const payloadBody = JSON.stringify({
        dormName: dormData.name,
        userId: userId || "guest", // Use actual user ID or "guest" if not logged in
        roomNumber: dormData.room,
        paymentAmount: entranceFee.toString(),
        phoneNumber: phoneNumber,
        imageData: imagePreview
      });

      // Create the outer structure exactly as specified
      const payload = {
        body: payloadBody
      };

      console.log("Sending payment data to proxy API...");
      
      // Call our proxy API route instead of calling API Gateway directly
      // This avoids CORS issues
      const response = await fetch("/api/uploadSlip", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      console.log("API response status:", response.status);
      
      // Parse response data
      const responseData = await response.json();
      console.log("API response data:", responseData);
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}, details: ${JSON.stringify(responseData)}`);
      }

      // Handle nested JSON response (the API returns statusCode and body as a string)
      let result;
      if (responseData.body && typeof responseData.body === 'string') {
        try {
          result = JSON.parse(responseData.body);
          console.log("Parsed response body:", result);
        } catch (parseError) {
          console.error("Error parsing response body:", parseError);
          result = responseData;
        }
      } else {
        result = responseData;
      }

      // Check if the upload was successful
      const isSuccess = result.success || (responseData.statusCode === 200);
      
      if (isSuccess) {
        // Show success message
        setPaymentStatus({
          isSubmitting: false,
          message: result.message || "อัปโหลดหลักฐานการชำระเงินสำเร็จ! เราจะติดต่อกลับเพื่อยืนยันการจองภายใน 24 ชั่วโมง",
          isError: false
        });

        // Reset form
        setImagePreview(null);
        setPhoneNumber("");
        
        // Optional: You can redirect the user to a confirmation page
        // window.location.href = "/booking-confirmation"; 
      } else {
        throw new Error("Upload failed: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error uploading payment slip:", error);
      setPaymentStatus({
        isSubmitting: false,
        message: "เกิดข้อผิดพลาดในการอัปโหลด กรุณาลองอีกครั้งหรือติดต่อเจ้าหน้าที่",
        isError: true
      });
    }
  };

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
            <h2 className="text-xl font-bold mb-4">Price Detail</h2>
            <div className="space-y-3">
              <p>
                ค่าแรกเข้า (รวมค่าประกัน)
                <span className="ml-2 font-semibold">{entranceFee.toLocaleString()} บาท</span>
              </p>
              <hr className="border-gray-200" />
              <p className="font-bold text-2xl">
                TOTAL <span className="ml-2">{entranceFee.toLocaleString()} บาท</span>
              </p>
            </div>
          </div>

          {/* Room Detail */}
          <div className="border border-gray-200 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Room Detail</h2>
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
              <p className="font-extrabold text-lg">{dormData.name}</p>
              <p className="text-sm text-gray-600 flex items-center">
                <span className="mr-2">📍</span> {dormData.address ? dormData.address.split(" ").slice(0, 4).join(" ") : ""}
              </p>
              <hr className="border-gray-200" />
              <div className="flex justify-between">
                <p className="ml-5">ชั้นห้องพัก</p>
                <p className="font-medium mr-5">ชั้น {dormData.floor}</p>
              </div>
              <hr className="border-gray-400" />
              <div className="flex justify-between">
                <p className="ml-5">เลขห้อง</p>
                <p className="font-medium mr-5">{dormData.room}</p>
              </div>
              <hr className="border-gray-400" />
              <div className="flex justify-between">
                <p className="ml-5">ค่าเช่า</p>
                <p className="font-medium mr-5">{dormData.price.toLocaleString()} บาท / เดือน</p>
              </div>
              <hr className="border-gray-400" />
              <div className="flex justify-between">
                <p className="ml-5">ค่าไฟ</p>
                <p className="font-medium mr-5">8 บาท / หน่วย</p>
              </div>
              <hr className="border-gray-400" />
              <div className="flex justify-between">
                <p className="ml-5">ค่าน้ำ</p>
                <p className="font-medium mr-5">18 บาท / หน่วย</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Payment Method */}
        <form onSubmit={handleSubmit} className="border border-gray-200 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>
          <div className="space-y-4">
            {/* Bank Transfer */}
            <div className="flex justify-between">
              <p className="font-medium ml-10">ธนาคาร</p>
              <p className="font-medium mr-10">กสิกรไทย</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium ml-10">เลขบัญชี</p>
              <p className="font-medium mr-10">6662132015</p>
            </div>
            <div className="flex items-center justify-center my-4">
              <hr className="w-1/4 border-gray-300" />
              <span className="mx-4 text-gray-500">or</span>
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
              <p className="font-medium mb-2">แนบรูปหลักฐานการโอนเงิน</p>
              <label
                htmlFor="file-upload"
                className="border-dashed border-2 border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors duration-300 block min-h-[120px] flex flex-col items-center justify-center"
              >
                {imagePreview ? (
                  <div className="relative w-full h-32">
                    <Image
                      src={imagePreview}
                      alt="Payment slip preview"
                      fill
                      className="object-contain"
                    />
                    <button 
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                      onClick={() => setImagePreview(null)}
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500">คลิกเพื่ออัปโหลดรูปภาพ</p>
                )}
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            {/* Phone Number */}
            <div>
              <p className="font-medium my-2">เบอร์โทรศัพท์</p>
              <input
                type="text"
                placeholder="Insert phone number"
                className="w-full border border-gray-300 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={10}
              />
            </div>
            
            {/* Status Message */}
            {paymentStatus.message && (
              <div className={`p-3 rounded ${paymentStatus.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {paymentStatus.message}
              </div>
            )}
            
            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={paymentStatus.isSubmitting}
            >
              {paymentStatus.isSubmitting ? "กำลังอัปโหลด..." : "SUBMIT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}