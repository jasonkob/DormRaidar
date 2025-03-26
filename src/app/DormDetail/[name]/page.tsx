"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ImgSlide from "./imageSlider";
import Image from "next/image";
import { DormReviewComponent } from "./DormReviewComponent";

export default function Dorm() {
  const router = useRouter();
  
  interface Dorm {
    name: string;
    address: string;
    image: string;
    price: number;
    location: { lat: number; lng: number };
    convenience: string[];
    distance_from_reference_m: number;
    floor: number;
    room: string;
    phone: string;
  }

  interface User {
    id: string;
    email: string;
    name: string;
  }

  const dormRule = [
    "สามารถทำอาหารได้",
    "ไม่อนุญาตให้เลี้ยงสัตว์",
    "ระมัดระวังในการใช้เสียงให้ไม่รบกวนผู้อื่น",
  ];

  const params = useParams();
  const name = params?.name ? decodeURIComponent(params.name as string) : "";
  const [filteredDorms, setFilteredDorms] = useState<Dorm[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ตรวจสอบการล็อกอิน
    const checkAuth = () => {
      try {
        const token = localStorage.getItem("authToken");
        const userJSON = localStorage.getItem("user");
        
        if (token && userJSON) {
          setIsLoggedIn(true);
          try {
            const userData = JSON.parse(userJSON);
            setUser(userData);
          } catch (error) {
            console.error("Error parsing user data:", error);
          }
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };
    
    if (typeof window !== 'undefined') {
      checkAuth();
    }
  }, []);

  useEffect(() => {
    const loadDorms = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://4m89qryq9k.execute-api.ap-southeast-1.amazonaws.com/default/getAllDorms", {
          method: "GET"
        });
        const data: Dorm[] = await response.json();

        const matchingDorms = data.filter((dorm) => dorm.name === name);
        setFilteredDorms(matchingDorms);
        setLoading(false);
      } catch (error) {
        console.error("Error loading dorm list:", error);
        setLoading(false);
      }
    };

    loadDorms();
  }, [name]);

  const handleBooking = () => {
    if (!isLoggedIn) {
      // ถ้าไม่ได้ล็อกอิน ให้ redirect ไปหน้า login
      router.push('/login');
    } else {
      // ถ้าล็อกอินแล้ว ให้ไปหน้าชำระเงิน
      router.push(`/payment/${encodeURIComponent(filteredDorms[0].name)}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
        <span className="ml-3">กำลังโหลดข้อมูล...</span>
      </div>
    );
  }

  return (
    <div className='w-full h-screen overflow-visible '>
      {filteredDorms.length > 0 ? (
        <>
          {/* dorm image */}
          <section className=' w-full h-1/2 flex justify-center '>
            <div className=' w-4/6 h-full mx-5 mr-10 overflow-hidden rounded-xl select-none'>
              <ImgSlide image={filteredDorms[0].image} />
            </div>

            {/* mockup room exam image */}
            <div className='w-2/6 h-full mx-2 '>
              <div className='w-full h-1/2 relative ml-1'>
                <Image src='/roomExam1.png' alt='more Image' fill />
              </div>
              <div className='flex w-full h-full mt-2'>
                <div className='w-full h-1/2 relative mr-1 ml-2'>
                  <Image src='/roomExam2.png' alt='more Image' fill />
                </div>
                <div className='w-full h-1/2 relative ml-1 '>
                  <div className='absolute inset-0 flex items-center justify-center  text-xl font-bold z-10'>
                    +2
                  </div>
                  <Image
                    src='/roomExam3.png'
                    alt='more Image'
                    fill
                    className='opacity-40'
                  />
                </div>
              </div>
            </div>
          </section>

          {/* dorm detail */}
          <section className='w-full flex mx-5 my-3'>
            {/* dorm rule, dorm rate */}
            <div className='w-4/6 mr-2 mb-3'>
              <div className='text-[22px] font-semibold'>
                {filteredDorms[0].name}
              </div>
              <div className='flex mt-1 items-center'>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z'
                    fill='#999999'
                  />
                </svg>
                <span className='text-[16px] text-slate-400 ml-2'>
                  {filteredDorms[0].address.split(" ").slice(0, 4).join(" ")}
                </span>
                <span className='mx-3 text-[16px] ml-3'>
                  เบอร์ติดต่อ {filteredDorms[0].phone}
                </span>
              </div>

              <div className='mt-8'>
                <span className='text-[20px] font-semibold'>
                  สิ่งอำนวยความสะดวก
                </span>
                <div className='mt-4'>
                  {filteredDorms[0].convenience.map((data, index) => (
                    <span
                      key={index}
                      className='p-3 mr-3 bg-indigo-400 text-white rounded-lg select-none'
                    >
                      {data}
                    </span>
                  ))}
                </div>
              </div>

              <div className='mt-6'>
                <span className='text-[20px] font-semibold'>
                  กฎระเบียบหอพัก
                </span>
                <ul>
                  {dormRule.map((rule, index) => (
                    <li key={index} className='list-disc pl-3 ml-6 mb-1 mt-1'>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ส่วนรีวิวที่ใช้ DormReviewComponent แทน */}
              <DormReviewComponent 
                dormName={filteredDorms[0].name} 
                currentUser={user} 
              />
            </div>

            {/* book dorm */}
            <div className='w-2/6 relative ml-2 mt-2'>
              <div className='w-11/12 absolute top-0  flex flex-col border border-slate-300 text-center rounded-xl items-center'>
                <span className='text-[20px] font-semibold mt-2'>
                  รายละเอียดห้องพัก
                </span>
                <div className='w-full mt-3'>
                  <div className='flex justify-between px-4 py-2 mt-2 mx-2 border-b'>
                    <span>ชั้นห้องพัก</span>
                    <span>ชั้น {filteredDorms[0].floor}</span>
                  </div>
                  <div className='flex justify-between px-4 py-2 mt-2 mx-2 border-b'>
                    <span>เลขห้อง</span>
                    <span>{filteredDorms[0].room}</span>
                  </div>
                  <div className='flex justify-between px-4 py-2 mt-2 mx-2 border-b'>
                    <span>ค่าเช่า</span>
                    <span>
                      {filteredDorms[0].price} บาท{" "}
                      <span className='text-[14px] text-slate-400'>/เดือน</span>
                    </span>
                  </div>
                  <div className='flex justify-between px-4 py-2 mt-2 mx-2 border-b'>
                    <span>ค่าแรกเข้า</span>
                    <span>{filteredDorms[0].price * 2} บาท</span>
                  </div>
                  <div className='flex justify-between px-4 py-2 mt-2 mx-2 border-b'>
                    <span>ค่าไฟ</span>
                    <span>
                      8 บาท{" "}
                      <span className='text-[14px] text-slate-400'>/หน่วย</span>
                    </span>
                  </div>
                  <div className='flex justify-between px-4 py-2 mt-2 mx-2 border-b mb-2'>
                    <span>ค่าน้ำ</span>
                    <span>
                      18 บาท{" "}
                      <span className='text-[14px] text-slate-400'>/หน่วย</span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleBooking}
                  className='w-11/12 bg-yellow-400 text-[20px] p-2 rounded-lg my-5 mb-10 transition duration-200 ease-in-out shadow-lg hover:bg-yellow-300'>
                  จองหอพัก
                </button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <p>Loading dorm information...</p>
      )}
    </div>
  );
}