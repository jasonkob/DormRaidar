"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";

interface imgSlideProps{
    image : string;
}
export default function ImgSlide (props:imgSlideProps){
    const {image} = props
    console.log(image)

    return(
        <div className="w-full h-full flex justify-center">
           <Swiper 
            spaceBetween={10} 
            slidesPerView={1} 
            navigation={true} 
            modules={[Navigation]}
            className="w-full">
                {Array.from({ length: 4 }).map((_, index) => (
                    <SwiperSlide key={index}>
                        <Image 
                            src={image} 
                            alt={`dormImage ${index + 1}`} 
                            fill 
                            className="w-full h-full object-cover rounded-xl" 
                            priority
                            />
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}