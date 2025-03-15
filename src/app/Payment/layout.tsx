'use client'

import { useState } from "react"
import Link from "next/link"

export default function userLayout({
    children}:{
        children:React.ReactNode
    }){
    
    const [shwMenu,setShwMenu] = useState(false)
    const showMenu = ()=>{
        setShwMenu(!shwMenu)
    }
    return(
        <div className="px-4 py-2 flex flex-col justify-center">
            <div className="flex justify-between items-center h-[80px] z-10">
                <div className="flex flex-row ">
                    <Link href="/Home">
                        <img className="w-28 h-20" src='/logo.png' alt="logo" />
                    </Link>
                    <div className="flex items-center mx-8">
                        <Link href="/Home" className="mx-4 text-base  transition-all duration-200 ease-out hover:font-semibold hover:underline">Home</Link>
                        <Link href="/Booked" className="mx-4 text-base transition-all duration-200 ease-out hover:font-semibold hover:underline">My booking</Link>
                        <Link href="/FindDorm" className="mx-4 text-base transition-all duration-200 ease-out hover:font-semibold hover:underline">Find Dorm</Link>
                    </div>
                </div>
                <div className="relative flex flex-col justify-center mr-4  ">
                    <div className="flex flex-row items-center  p-2 border-2  rounded-xl cursor-pointer transition-all duration-150 ease-in-out  hover:shadow-xl bg-white" onClick={showMenu}>
                        <svg className="mx-2" width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 1.28571C0 0.944722 0.131696 0.617695 0.366117 0.376577C0.600537 0.135459 0.918479 0 1.25 0H18.75C19.0815 0 19.3995 0.135459 19.6339 0.376577C19.8683 0.617695 20 0.944722 20 1.28571C20 1.62671 19.8683 1.95373 19.6339 2.19485C19.3995 2.43597 19.0815 2.57143 18.75 2.57143H1.25C0.918479 2.57143 0.600537 2.43597 0.366117 2.19485C0.131696 1.95373 0 1.62671 0 1.28571ZM0 9C0 8.65901 0.131696 8.33198 0.366117 8.09086C0.600537 7.84974 0.918479 7.71429 1.25 7.71429H18.75C19.0815 7.71429 19.3995 7.84974 19.6339 8.09086C19.8683 8.33198 20 8.65901 20 9C20 9.34099 19.8683 9.66802 19.6339 9.90914C19.3995 10.1503 19.0815 10.2857 18.75 10.2857H1.25C0.918479 10.2857 0.600537 10.1503 0.366117 9.90914C0.131696 9.66802 0 9.34099 0 9ZM1.25 15.4286C0.918479 15.4286 0.600537 15.564 0.366117 15.8051C0.131696 16.0463 0 16.3733 0 16.7143C0 17.0553 0.131696 17.3823 0.366117 17.6234C0.600537 17.8645 0.918479 18 1.25 18H18.75C19.0815 18 19.3995 17.8645 19.6339 17.6234C19.8683 17.3823 20 17.0553 20 16.7143C20 16.3733 19.8683 16.0463 19.6339 15.8051C19.3995 15.564 19.0815 15.4286 18.75 15.4286H1.25Z" fill="black"/>
                        </svg>
                        <svg className="mx-2" width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_120_327)">
                            <path d="M40 19.98C40 8.95 31.04 0 20 0C8.96 0 0 8.95 0 19.98C0 26.055 2.76 31.53 7.08 35.205C7.12 35.245 7.16 35.245 7.16 35.285C7.52 35.565 7.88 35.845 8.28 36.125C8.48 36.245 8.64 36.4025 8.84 36.5625C12.1465 38.8006 16.0472 39.9978 20.04 40C24.0328 39.9978 27.9335 38.8006 31.24 36.5625C31.44 36.4425 31.6 36.285 31.8 36.1625C32.16 35.885 32.56 35.605 32.92 35.325C32.96 35.285 33 35.285 33 35.245C37.24 31.5275 40 26.055 40 19.98ZM20 37.4825C16.24 37.4825 12.8 36.2825 9.96 34.285C10 33.965 10.08 33.6475 10.16 33.3275C10.3991 32.4605 10.7487 31.6279 11.2 30.85C11.64 30.09 12.16 29.41 12.8 28.81C13.4 28.21 14.12 27.6525 14.84 27.2125C15.6 26.7725 16.4 26.4525 17.28 26.2125C18.1671 25.9749 19.0816 25.8547 20 25.855C22.7269 25.8344 25.3538 26.8805 27.32 28.77C28.24 29.69 28.96 30.7692 29.48 32.0075C29.76 32.7275 29.96 33.4867 30.08 34.285C27.1279 36.3604 23.6086 37.4768 20 37.4825ZM13.88 18.9825C13.5283 18.1753 13.3511 17.3029 13.36 16.4225C13.36 15.545 13.52 14.665 13.88 13.865C14.24 13.065 14.72 12.3475 15.32 11.7475C15.92 11.1475 16.64 10.67 17.44 10.31C18.24 9.95 19.12 9.79 20 9.79C20.92 9.79 21.76 9.95 22.56 10.31C23.36 10.67 24.08 11.15 24.68 11.7475C25.28 12.3475 25.76 13.0675 26.12 13.865C26.48 14.665 26.64 15.545 26.64 16.4225C26.64 17.3425 26.48 18.1825 26.12 18.98C25.7746 19.7693 25.2864 20.488 24.68 21.1C24.0678 21.7055 23.3491 22.1928 22.56 22.5375C20.9068 23.2154 19.0532 23.2154 17.4 22.5375C16.6109 22.1928 15.8922 21.7055 15.28 21.1C14.6731 20.4966 14.1966 19.7776 13.88 18.9825ZM32.44 32.2475C32.44 32.1675 32.4 32.1275 32.4 32.0475C32.0073 30.7958 31.4274 29.6107 30.68 28.5325C29.932 27.4464 29.0135 26.4883 27.96 25.695C27.1551 25.0893 26.2826 24.5792 25.36 24.175C25.7778 23.8955 26.1664 23.5747 26.52 23.2175C27.1163 22.6288 27.6401 21.9707 28.08 21.2575C28.9689 19.8033 29.4267 18.1266 29.4 16.4225C29.4131 15.1612 29.1681 13.9106 28.68 12.7475C28.1987 11.6266 27.5061 10.6089 26.64 9.75C25.773 8.90262 24.7556 8.22436 23.64 7.75C22.4752 7.26213 21.2228 7.01795 19.96 7.0325C18.697 7.01874 17.4446 7.26378 16.28 7.7525C15.1521 8.22107 14.1314 8.91431 13.28 9.79C12.4282 10.6524 11.7493 11.6699 11.28 12.7875C10.7919 13.9506 10.5469 15.2012 10.56 16.4625C10.56 17.3425 10.68 18.1817 10.92 18.98C11.16 19.82 11.48 20.58 11.92 21.2975C12.32 22.0175 12.88 22.6575 13.48 23.2575C13.84 23.6175 14.24 23.9367 14.68 24.215C13.7532 24.6276 12.8802 25.1514 12.08 25.775C11.04 26.575 10.12 27.5325 9.36 28.5725C8.60568 29.6466 8.02524 30.8328 7.64 32.0875C7.6 32.1675 7.6 32.2475 7.6 32.2875C4.44 29.09 2.48 24.775 2.48 19.98C2.48 10.35 10.36 2.4775 20 2.4775C29.64 2.4775 37.52 10.35 37.52 19.98C37.5148 24.5799 35.6883 28.9906 32.44 32.2475Z" fill="black"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_120_327">
                                <rect width="40" height="40" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                    </div>
                    {shwMenu && (
                        <div className="absolute -bottom-[175px] right-0 w-[200px] h-[165px] border bg-white rounded-lg">
                            <ul className="border-b-2 mt-1">
                                <li className="cursor-pointer select-none transition duration-150 ease-in-out  hover:bg-yellow-200 "><Link href="/Register"><p  className="px-4 py-2 text-[14px] font-semibold text-black ">Sign up</p></Link></li>
                                <li className="cursor-pointer select-none transition duration-150 ease-in-out  hover:bg-yellow-200 "><Link href="/Login"><p className="px-4 py-2 text-[14px] text-black">Login</p></Link></li>
                            </ul>
                            <ul className=" mt-1 mb-1">
                                <li className="cursor-pointer select-none transition duration-150 ease-in-out  hover:bg-yellow-200 "><Link href="/Register" ><p className="px-4 py-2 text-[14px] text-black">Become Dorm Admin</p></Link></li>
                                <li className="cursor-pointer select-none transition duration-150 ease-in-out  hover:bg-yellow-200 "><Link href="/Login" ><p className="px-4 py-2 text-[14px] text-black">Dorm Admin Login</p></Link></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-center px-2">
                {children}
            </div>
        </div>
    )
}