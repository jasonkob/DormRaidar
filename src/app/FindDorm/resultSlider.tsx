'use client'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

interface Dorm {
    name: string;
    address: string;
    image: string;
    price: number;
    location: { lat: number; lng: number };
}

interface DormSliderProps {
  dormList: Dorm[];
  selectedDorm: string | null;
}

const DormSlider: React.FC<DormSliderProps> = ({ dormList, selectedDorm }) => {
    const swiperRef = useRef<SwiperType | null>(null);

    const visibleDorms = dormList.filter(dorm => dorm.image);
    
    useEffect(() => {
        if (selectedDorm && swiperRef.current) {
          console.log(selectedDorm);
          const index = visibleDorms.findIndex((dorm) => dorm.name === selectedDorm);
          console.log(index);
          if (index !== -1) {
            swiperRef.current.slideToLoop(index);
          }
        }
    }, [selectedDorm, visibleDorms]);

    const handlePrev = () => {
      if (swiperRef.current) swiperRef.current.slidePrev();
    };
  
    const handleNext = () => {
      if (swiperRef.current) swiperRef.current.slideNext();
    };

    return (
      <>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        spaceBetween={15}
        slidesPerView={3} 
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        modules={[Navigation]}
        className="w-full relative"
      >
        <div className="custom-prev absolute left-0 top-[110px] transform -translate-y-1/2 z-10">
          <button onClick={handlePrev}>
            <svg className="w-10 h-10 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>

        {dormList.map((dorm, index) =>
          dorm.image ? (
            <SwiperSlide key={index} className="relative">
               <Link href={`/dorm/${dorm.name}`} className="swiper-slide-active">
                  <div className="relative w-full h-[200px] p-2">
                    <div className="w-full h-full relative">
                      <Image
                        src={dorm.image}
                        fill
                        className="rounded-2xl select-none object-cover transition duration-150 ease-in-out hover:opacity-80 hover:scale-105"
                        alt={`${dorm.name} image`}
                      />
                    </div>
                  </div>
                  <span className="text-[20px] font-semibold">{dorm.name}</span>
              </Link>
              <div className="">
                  <div className="flex items-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z" fill="#999999"/>
                    </svg>
                    <span className="text-slate-500 ml-1 text-[12px]">{dorm.address.split(" ").slice(0,4).join(" ")}</span>
                  </div>
                  <span className="mt-4 text-[20px] font-semibold">{`${dorm.price}`}</span><span className="text-[14px] ml-2 text-slate-500">/month</span>
              </div>
            </SwiperSlide>
          ) : null
        )}

        <div className="custom-next absolute right-0 top-[110px] transform -translate-y-1/2 z-10">
          <button className="p-2" onClick={handleNext}>
            <svg className="w-10 h-10 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </Swiper>
      </>
    );
  };
  
export default DormSlider;