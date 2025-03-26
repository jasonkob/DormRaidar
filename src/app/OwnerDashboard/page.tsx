"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

const UnitsConfirmation = () => {
  // State variables
  interface Owner {
    id: string;
    email?: string;
    name?: string;
  }
  const [owner, setOwner] = useState<Owner | null>(null);
  interface Booking {
    booking_id: string;
    userName: string;
    dorm_name: string;
    room_number?: string;
    tel: string;
    booking_date: string;
    qr_url?: string;
  }

  interface Dormitory {
    name: string;
    address: string;
    price: number;
    phone: string;
    [key: string]: string | number | boolean | undefined;
  }
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  
  // Add state for storing raw API responses for debugging
  interface ApiResponses {
    dormitories: Record<string, unknown> | null;
    bookings: Record<string, unknown> | null;
  }
  
  const [apiResponses, setApiResponses] = useState<ApiResponses>({
    dormitories: null,
    bookings: null
  });
  const [debugMode, setDebugMode] = useState(false); // Debug mode toggle
  
  // Direct API endpoints
  const API_ENDPOINTS = {
    getOwnedDormitories: "https://zu7fn9gm20.execute-api.ap-southeast-1.amazonaws.com/default/getOwnedDormitories",
    getBookingsByDorms: "https://kbldsnd4ee.execute-api.ap-southeast-1.amazonaws.com/default/getBookingsByDorms",
    updateBookingStatus: "https://7uaqo4nyvl.execute-api.ap-southeast-1.amazonaws.com/default/updateBookingStatus"
  };

  // Get owner data from localStorage
  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      if (userData) {
        const parsedUser = JSON.parse(userData);
        setOwner(parsedUser);
        
        // Log owner data for debugging
        console.log("Owner data from localStorage:", parsedUser);
      } else {
        setError("User not logged in");
      }
    } catch (error) {
      setError("Error loading user data");
      console.error(error);
    }
  }, []);

  // Fetch bookings once we have owner data
  useEffect(() => {
    if (!owner) return;
    
    const fetchBookings = async () => {
      try {
        console.log("Fetching dormitories for owner ID:", owner.id);
        
        // Step 1: Get owned dormitories
        const ownedDormRequestData = {
          body: JSON.stringify({ ownerId: owner.id })
        };
        
        console.log("Request to getOwnedDormitories:", ownedDormRequestData);
        
        const dormResponse = await axios.post(
          API_ENDPOINTS.getOwnedDormitories,
          ownedDormRequestData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        console.log("Response from getOwnedDormitories:", dormResponse.data);
        
        // Store raw response for debugging
        setApiResponses((prev: ApiResponses) => ({...prev, dormitories: dormResponse.data}));
        
        // Parse the dormitories data from the response
        let dormitories = [];
        
        // Check if response body is a string (needs parsing) or already an object
        if (dormResponse.data.body && typeof dormResponse.data.body === 'string') {
          const parsedBody = JSON.parse(dormResponse.data.body);
          dormitories = parsedBody.dormitories || [];
        } else if (dormResponse.data.dormitories) {
          dormitories = dormResponse.data.dormitories;
        }
        
        // If no dormitories, return early
        if (dormitories.length === 0) {
          console.log("No dormitories found for this owner");
          setLoading(false);
          return;
        }
        
        // Step 2: Get bookings for these dormitories
        const dormNames = dormitories.map((dorm: { name: string }) => dorm.name);
        console.log("Dormitory names:", dormNames);
        
        const bookingsRequestData = {
          body: JSON.stringify({ 
            dormNames: dormNames,
            status: "Verifying payment" 
          })
        };
        
        console.log("Request to getBookingsByDorms:", bookingsRequestData);
        
        const bookingResponse = await axios.post(
          API_ENDPOINTS.getBookingsByDorms,
          bookingsRequestData,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        console.log("Response from getBookingsByDorms:", bookingResponse.data);
        
        // Store raw response for debugging
        setApiResponses((prev: typeof apiResponses) => ({...prev, bookings: bookingResponse.data}));
        
        // Parse the bookings data from the response
        let bookingsData = [];
        
        // Check if response body is a string (needs parsing) or already an object
        if (bookingResponse.data.body && typeof bookingResponse.data.body === 'string') {
          const parsedBody = JSON.parse(bookingResponse.data.body);
          bookingsData = parsedBody.bookings || [];
        } else if (bookingResponse.data.bookings) {
          bookingsData = bookingResponse.data.bookings;
        }
        
        setBookings(bookingsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(`Error fetching bookings: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [owner, API_ENDPOINTS.getOwnedDormitories, API_ENDPOINTS.getBookingsByDorms]);

  // Toggle debug mode
  const toggleDebugMode = () => {
    setDebugMode(!debugMode);
  };

  // Handle verification button click
  const handleVerifyPayment = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowPaymentPopup(true);
  };

  // Handle confirm payment
  const handleConfirmPayment = async () => {
    if (!selectedBooking) return;
    
    try {
      console.log("Confirming payment for booking:", selectedBooking.booking_id);
      
      const updateRequestData = {
        body: JSON.stringify({ 
          booking_id: selectedBooking.booking_id,
          newStatus: "Booking complete" 
        })
      };
      
      console.log("Request to updateBookingStatus:", updateRequestData);
      
      const response = await axios.post(
        API_ENDPOINTS.updateBookingStatus,
        updateRequestData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log("Response from updateBookingStatus:", response.data);
      
      // Update the local state
      setBookings(bookings.filter(b => b.booking_id !== selectedBooking.booking_id));
      setShowPaymentPopup(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error confirming payment:", error);
      alert("Failed to confirm payment. Please try again.");
    }
  };

  // Handle cancel payment
  const handleCancelPayment = async () => {
    if (!selectedBooking) return;
    
    try {
      console.log("Cancelling booking:", selectedBooking.booking_id);
      
      const updateRequestData = {
        body: JSON.stringify({ 
          booking_id: selectedBooking.booking_id,
          newStatus: "Cancelled" 
        })
      };
      
      console.log("Request to updateBookingStatus:", updateRequestData);
      
      const response = await axios.post(
        API_ENDPOINTS.updateBookingStatus,
        updateRequestData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log("Response from updateBookingStatus:", response.data);
      
      // Update the local state
      setBookings(bookings.filter(b => b.booking_id !== selectedBooking.booking_id));
      setShowPaymentPopup(false);
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error cancelling payment:", error);
      alert("Failed to cancel payment. Please try again.");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    window.location.href = "/Home";
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      // Assuming date format is DD/MM/YY
      const [day, month, year] = dateString.split('/');
      return `${day}/${month}/${year}`;
    } catch {
      return dateString;
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex justify-center items-center">
        <div className="text-xl text-black font-semibold">กำลังโหลดข้อมูล...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-xl font-semibold text-red-500 mb-4">เกิดข้อผิดพลาด</div>
          <div className="text-gray-700">{error}</div>
          <button 
            onClick={handleLogout}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            กลับไปหน้าล็อกอิน
          </button>
        </div>
      </div>
    );
  }

  // Current date
  const currentDate = format(new Date(), "dd/MM/yyyy");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section with Debug Toggle */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {currentDate}
              </h1>
              <button 
                onClick={toggleDebugMode}
                className="text-xs text-gray-500 underline"
              >
                {debugMode ? "ปิดโหมดดีบัก" : "เปิดโหมดดีบัก"}
              </button>
            </div>
            <h2 className="text-xl font-semibold text-gray-700 flex items-center">
              <span className="inline-block w-2 h-6 bg-blue-500 mr-3 rounded"></span>
              การยืนยันการจอง
            </h2>
          </div>
        </div>

        {/* Debug Information (only when debug mode is enabled) */}
        {/* {debugMode && (
          <div className="text-black mb-8 bg-gray-100 p-4 rounded-lg">
            <h3 className="text-black font-bold mb-2">Debug Information:</h3>
            <p><strong>Owner ID:</strong> {owner?.id || 'Not found'}</p>
            <div className="mt-2">
              <h4 className="font-semibold">API Responses:</h4>
              <div className="bg-white p-2 rounded mt-1 overflow-auto max-h-60">
                <pre className="text-xs">{JSON.stringify(apiResponses, null, 2)}</pre>
              </div>
            </div>
          </div>
        )} */}

        {/* Booking Confirmation Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              การยืนยันการจอง
            </h2>
            <p className="text-gray-500">รายการยืนยันการจองล่าสุด</p>
          </div>

          <div className="overflow-x-auto">
            {bookings.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      ชื่อผู้จอง
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      ชื่อหอพัก
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      เลขห้อง
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      เบอร์โทร
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      วันที่จอง
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      หลักฐานการชำระเงิน
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.booking_id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-700">{booking.userName}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {booking.dorm_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{booking.room_number || "-"}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{booking.tel}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{formatDate(booking.booking_date)}</td>
                      <td className="px-6 py-4 text-sm">
                        <button 
                          onClick={() => handleVerifyPayment(booking)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
                        >
                          ตรวจสอบหลักฐาน
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-gray-500">
                ไม่มีการจองที่รอการยืนยัน
                {debugMode && apiResponses.bookings && (
                  <div className="mt-2 text-xs text-left bg-gray-100 p-2 rounded">
                    <p className="font-semibold">Raw bookings response:</p>
                    <pre>{JSON.stringify(apiResponses.bookings, null, 2)}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Display owned dormitories (only when debug mode is enabled) */}
        {debugMode && apiResponses.dormitories && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="text-black p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                หอพักที่เป็นเจ้าของ (Debug)
              </h2>
            </div>
            <div className="p-4">
              <div className="text-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(() => {
                  // Parse dormitories from the response
                  let dormitories: Dormitory[] = [];
                  if (apiResponses.dormitories?.body && typeof apiResponses.dormitories.body === 'string') {
                    try {
                      const parsedBody = JSON.parse(apiResponses.dormitories.body);
                      dormitories = parsedBody.dormitories || [];
                    } catch (error) {
                      console.error("Error parsing dormitories:", error);
                      return <div>Error parsing dormitories data</div>;
                    }
                  } else if (apiResponses.dormitories?.dormitories) {
                    dormitories = apiResponses.dormitories.dormitories as Dormitory[];
                  }
                  
                  return dormitories.map((dorm: Dormitory, index: number) => (
                    <div key={index} className="border rounded p-3">
                      <p><strong>ชื่อหอพัก:</strong> {dorm.name}</p>
                      <p><strong>ที่อยู่:</strong> {dorm.address}</p>
                      <p><strong>ราคา:</strong> ฿{dorm.price}</p>
                      <p><strong>เบอร์โทร:</strong> {dorm.phone}</p>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-12 flex justify-center p-6 bg-white rounded-xl shadow-md">
          <button
            onClick={handleLogout}
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

      {/* Payment Verification Popup */}
      {showPaymentPopup && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h2 className="text-xl font-bold mb-4 text-black">ตรวจสอบหลักฐานการชำระเงิน</h2>
            
            <div className="mb-4 text-black">
              <p className="mb-1"><span className="text-black font-semibold">ชื่อลูกค้า:</span> {selectedBooking.userName}</p>
              <p className="mb-1"><span className="text-black font-semibold">ชื่อที่พัก:</span> {selectedBooking.dorm_name}</p>
              <p className="mb-1"><span className="text-black font-semibold">วันที่จอง:</span> {formatDate(selectedBooking.booking_date)}</p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-black mb-2">หลักฐานการชำระเงิน:</h3>
              <div className="flex justify-center ">
                {selectedBooking.qr_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                    src={selectedBooking.qr_url} 
                    alt="หลักฐานการชำระเงิน" 
                    className="max-h-80 object-contain rounded border"
                  />
                ) : (
                  <div className="bg-gray-200 p-8 rounded text-gray-500">ไม่พบรูปภาพหลักฐานการชำระเงิน</div>
                )}
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPaymentPopup(false)}
                className="text-black px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                ปิด
              </button>
              <button
                onClick={handleCancelPayment}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                ยกเลิกการจอง
              </button>
              <button
                onClick={handleConfirmPayment}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                ยืนยันการจอง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitsConfirmation;