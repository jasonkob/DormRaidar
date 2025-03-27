'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// เพิ่ม interface สำหรับรายละเอียดของหอพัก
interface DormDetails {
    image?: string;
    address?: string;
    room?: string;
    phone?: string;
    location?: {
        lat: number;
        lng: number;
    };
    convenience?: string[];
    location_area?: string;
    price?: number;
    floor?: number;
    name?: string;
    distance_from_reference_m?: number;
}

// เพิ่ม interface สำหรับข้อมูลการจอง
interface Booking {
    booking_id: string;
    dorm_name: string;
    dormDetails?: DormDetails;
    tel?: string;
    booking_date: string;
    status: string;
    qr_url?: string;
    user_id?: string;
}

// คอมโพเนนท์สำหรับแสดงสถานะการจอง
function StatusBadge({ status }: { status: string }) {
    let bgColor = "bg-gray-200";
    let textColor = "text-gray-700";
    
    if (status === "Booking complete") {
        bgColor = "bg-green-200";
        textColor = "text-green-700";
    } else if (status === "Verifying payment") {
        bgColor = "bg-yellow-200";
        textColor = "text-yellow-700";
    } else if (status === "Waiting for payment") {
        bgColor = "bg-purple-200";
        textColor = "text-purple-700";
    } else if (status === "Cancelled") {
        bgColor = "bg-red-200";
        textColor = "text-red-700";
    }
    
    return (
        <span className={`${bgColor} ${textColor} px-3 py-1 mt-2 rounded-full text-sm`}>
            {status}
        </span>
    );
}

// คอมโพเนนท์สำหรับแสดงรายละเอียดการจองในรูปแบบ popup
function BookingDetailPopup({ booking, onClose }: { booking: Booking; onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-black">{booking.dorm_name}</h2>
                    <button 
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                        &times;
                    </button>
                </div>
                
                <div className="space-y-3">
                    <div className="border-b pb-2">
                        <h3 className="font-semibold text-black">ข้อมูลการจอง</h3>
                        <p className="text-sm text-gray-600">รหัสการจอง: <span className="font-medium">{booking.booking_id}</span></p>
                        <p className="text-sm text-gray-600">วันที่จอง: <span className="font-medium">{booking.booking_date}</span></p>
                        <p className="text-sm text-gray-600">สถานะ: <StatusBadge status={booking.status} /></p>
                    </div>
                    
                    <div className="border-b pb-2">
                        <h3 className="font-semibold text-black">ข้อมูลหอพัก</h3>
                        {booking.dormDetails && (
                            <>
                                <p className="text-sm text-gray-600">ที่อยู่: <span className="font-medium">{booking.dormDetails.address}</span></p>
                                <p className="text-sm text-gray-600">ห้อง: <span className="font-medium">{booking.dormDetails.room}</span></p>
                                <p className="text-sm text-gray-600">ชั้น: <span className="font-medium">{booking.dormDetails.floor}</span></p>
                                <p className="text-sm text-gray-600">ราคา: <span className="font-medium">{booking.dormDetails.price} บาท/เดือน</span></p>
                                <p className="text-sm text-gray-600">พื้นที่: <span className="font-medium">{booking.dormDetails.location_area}</span></p>
                                <p className="text-sm text-gray-600">เบอร์ติดต่อ: <span className="font-medium">{booking.tel || booking.dormDetails.phone}</span></p>
                            </>
                        )}
                    </div>
                    
                    {booking.dormDetails?.convenience && booking.dormDetails.convenience.length > 0 && (
                        <div>
                            <h3 className="font-semibold text-black">สิ่งอำนวยความสะดวก</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {booking.dormDetails.convenience.map((item, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {booking.qr_url && (
                        <div>
                            <h3 className="font-semibold text-black">สลิปจ่ายการจองหอ</h3>
                            <div className="flex justify-center mt-2">
                                <div className="relative w-48 h-48">
                                    <Image
                                        src={booking.qr_url}
                                        fill
                                        className="object-contain"
                                        alt="QR Payment"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-500"
                >
                    ปิด
                </button>
            </div>
        </div>
    );
}

export default function BookingList() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                setLoading(true);
                
                // รับ user_id จาก localStorage
                const userJSON = localStorage.getItem('user');
                if (!userJSON) {
                    throw new Error('User not logged in');
                }
                
                const userData = JSON.parse(userJSON);
                const userId = userData.id;
                
                // เรียกใช้ API เพื่อดึงข้อมูลการจอง
                const response = await fetch('https://9zlbgw9y8h.execute-api.ap-southeast-1.amazonaws.com/default/showBookingList', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        body: JSON.stringify({ userId }) 
                    }),
                });
                
                const data = await response.json();
                console.log("API response data:", data);

                // โค้ดส่วนนี้ใช้สำหรับ API Gateway ที่ตอบกลับแบบมี statusCode และ body
                if (data.statusCode === 200 && data.body) {
                  try {
                    // Parse body string เป็น JSON
                    const bodyData = JSON.parse(data.body);
                    console.log("Parsed body data:", bodyData);
                    
                    if (bodyData && bodyData.success) {
                      if (Array.isArray(bodyData.bookings)) {
                        setBookings(bodyData.bookings);
                      } else {
                        console.warn("bookings is not an array:", bodyData.bookings);
                        setBookings([]);
                      }
                    } else {
                      console.error("API returned error in body:", bodyData);
                      setError(bodyData?.message || 'Failed to fetch bookings');
                      setBookings([]);
                    }
                  } catch (parseError) {
                    console.error("Error parsing body:", parseError, "Raw body:", data.body);
                    setError('Invalid response format');
                    setBookings([]);
                  }
                } else {
                  // กรณีที่ไม่มี statusCode หรือ body ตามโครงสร้าง API Gateway
                  console.error("Unexpected API response format:", data);
                  setError('Unexpected response format from server');
                  setBookings([]);
                }
            } catch (err) {
                console.error('Error fetching bookings:', err);
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };
        
        fetchUserBookings();
    }, []);

    // เปิด popup แสดงรายละเอียดการจอง
    const openBookingDetail = (booking: Booking) => {
        setSelectedBooking(booking);
    };

    // ปิด popup
    const closeBookingDetail = () => {
        setSelectedBooking(null);
    };

    // แสดงข้อความกำลังโหลด
    if (loading) {
        return (
            <div className="bg-[url('/home.jpg')] bg-cover bg-center h-screen w-full rounded-3xl opacity-90 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-black text-xl font-semibold">กำลังโหลดข้อมูลการจอง...</p>
                </div>
            </div>
        );
    }

    // แสดงข้อผิดพลาด (ถ้ามี)
    if (error) {
        return (
            <div className="bg-[url('/home.jpg')] bg-cover bg-center h-screen w-full rounded-3xl opacity-90 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-red-500 font-semibold">{error}</p>
                    <p className="text-black mt-4">กรุณาเข้าสู่ระบบเพื่อดูข้อมูลการจองของคุณ</p>
                    <Link href="/login" className="mt-4 block text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                        เข้าสู่ระบบ
                    </Link>
                </div>
            </div>
        );
    }

    // แสดงหน้าหากไม่มีการจอง
    if (bookings.length === 0) {
        return (
            <div className="bg-[url('/home.jpg')] bg-cover bg-center h-screen w-full rounded-3xl opacity-90 flex justify-center items-center">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-xl font-semibold">คุณยังไม่มีการจองหอพัก</p>
                    <Link href="/FindDorm" className="mt-4 block text-center bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-500">
                        ค้นหาหอพักเลย
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[url('/home.jpg')] bg-cover bg-center min-h-screen w-full rounded-3xl opacity-90 pb-8">
            <div className="flex h-1/4 w-full justify-center items-end">
                <div className='flex items-center px-4 pt-4 h-[110px] w-[900px] rounded-xl'>
                    <section className='flex flex-col h-full w-4/12 '>
                        <h1 className="text-2xl font-bold mb-4 text-black">Booking List</h1>
                    </section>
                </div>
            </div>

            <div className="max-w-3xl mx-auto">
                {/* Booking Cards */}
                <div className="space-y-4">
                    {bookings.map((booking) => (
                        <div key={booking.booking_id} className="bg-white rounded-lg shadow-md flex overflow-hidden">
                            <div className="relative w-32 h-32">
                                <Image
                                    src={booking.dormDetails?.image || "/roomExam1.png"}
                                    fill
                                    className="object-cover"
                                    alt="Room"
                                />
                            </div>
                            <div className="flex-1 p-4">
                                <h2 className="text-lg font-bold text-black">{booking.dorm_name}</h2>
                                <p className="text-sm text-gray-600">
                                    📍 {booking.dormDetails?.address ? booking.dormDetails.address.split(" ").slice(0, 4).join(" ") : ""}
                                </p>
                                <p className="text-sm text-black"><strong>ห้อง {booking.dormDetails?.room || ""}</strong></p>
                                <p className="text-sm text-black">เบอร์ติดต่อ: {booking.tel || booking.dormDetails?.phone || ""}</p>
                                <p className="text-sm text-gray-500">Booking day: {booking.booking_date}</p>
                            </div>
                            <div className="flex flex-col items-end p-4">
                                <button 
                                    onClick={() => openBookingDetail(booking)}
                                    className="text-blue-500 text-sm hover:underline focus:outline-none"
                                >
                                    See detail
                                </button>
                                <StatusBadge status={booking.status} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Popup แสดงรายละเอียดการจอง */}
            {selectedBooking && (
                <BookingDetailPopup 
                    booking={selectedBooking} 
                    onClose={closeBookingDetail} 
                />
            )}
        </div>
    );
}