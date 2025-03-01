"use client";

import { useState, useEffect } from "react";
import GoogleMapsComponent from "./map";
import DormSlider from "./resultSlider";
import React from "react";

export default function Finddorm() {
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [distance, setDistance] = useState(0);
  const [shwLocation, setShwLocation] = useState(false);
  const [shwPrice, setShwPrice] = useState(false);
  const [shwType, setShwType] = useState(false);
  const [shwDistance, setShwDistance] = useState(false);
  const [furniture, setFurniture] = useState(false);
  const [allowPet, setAllowPet] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [waterHeater, setWaterHeater] = useState(false);
  const [air, setAir] = useState(false);

  const [dormList, setDormList] = useState<Dorm[]>([]);
  const [selectedDorm, setSelectedDorm] = useState<string | null>(null);
  const [filteredDormList, setFilteredDormList] = useState<Dorm[]>([]);

  interface Dorm {
    name: string;
    address: string;
    image: string;
    price: number;
    location: { lat: number; lng: number };
    location_area: string;
    convenience: string[];
    distance_from_reference_m: number;
    floor: number;
    room: string;
    phone: string;
  }

  useEffect(() => {
    const loadDorms = async () => {
      try {
        const response = await fetch("/allPlaces.json");
        const data = await response.json();
        setDormList(data);
        setFilteredDormList(data);
      } catch (error) {
        console.error("Error loading dorm list:", error);
      }
    };

    loadDorms();
  }, []);
  const handleApply = () => {
    applyFilters();
  };
  // Apply filters to dormList and update filteredDormList
  const applyFilters = () => {
    let filtered = [...dormList];

    // Filter by location if selected
    if (location !== "") {
      filtered = filtered.filter((dorm) => dorm.location_area === location);
    }

    // Filter by price if selected
    if (price > 0) {
      filtered = filtered.filter((dorm) => dorm.price <= price);
    }

    // Filter by property type if selected
    if (type !== "") {
      // ข้อมูลไม่มี field type จึงข้ามการกรองนี้ไป
    }

    // Filter by distance if selected
    if (distance > 0) {
      filtered = filtered.filter(
        (dorm) => dorm.distance_from_reference_m / 1000 <= distance
      );
    }

    // Filter by conveniences
    if (furniture) {
      filtered = filtered.filter(
        (dorm) => dorm.convenience && dorm.convenience.includes("furniture")
      );
    }
    if (allowPet) {
      filtered = filtered.filter(
        (dorm) => dorm.convenience && dorm.convenience.includes("allowpet")
      );
    }
    if (wifi) {
      filtered = filtered.filter(
        (dorm) => dorm.convenience && dorm.convenience.includes("wifi")
      );
    }
    if (waterHeater) {
      filtered = filtered.filter(
        (dorm) => dorm.convenience && dorm.convenience.includes("water heater")
      );
    }
    if (air) {
      filtered = filtered.filter(
        (dorm) =>
          dorm.convenience && dorm.convenience.includes("air conditioner")
      );
    }

    setFilteredDormList(filtered);
  };

  const allDistance = [
    { id: 1, content: 1 },
    { id: 2, content: 2 },
    { id: 3, content: 3 },
  ];
  const allType = [
    { id: 1, content: "Rental Room" },
    { id: 2, content: "Condo" },
    { id: 3, content: "Villa dormitory" },
  ];
  const allLocation = [
    { id: 1, content: "Keki Ngam 1" },
    { id: 2, content: "Keki Ngam 2" },
    { id: 3, content: "Keki Ngam 3" },
    { id: 4, content: "Chalong Krung" },
    { id: 5, content: "Chalong Krung 1" },
    { id: 6, content: "Lat Krabang" },
    { id: 7, content: "RNP Area" },
  ];
  const allPrice = [
    { id: 1, price: 4000 },
    { id: 2, price: 5000 },
    { id: 3, price: 6000 },
  ];

  // set to show/dont show filter list
  const resetAllShw = () => {
    setShwType(false);
    setShwDistance(false);
    setShwPrice(false);
    setShwLocation(false);
  };
  const showLocation = () => {
    resetAllShw();
    setShwLocation(!shwLocation);
  };
  const showPrice = () => {
    resetAllShw();
    setShwPrice(!shwPrice);
  };
  const showType = () => {
    resetAllShw();
    setShwType(!shwType);
  };
  const showDistance = () => {
    resetAllShw();
    setShwDistance(!shwDistance);
  };

  //upadate value in each filter
  const resetAllValue = () => {
    setLocation("");
    setPrice(0);
    setType("");
    setDistance(0);
    setFurniture(false);
    setAllowPet(false);
    setWifi(false);
    setWaterHeater(false);
    setAir(false);

    // รีเซ็ตการกรอง กลับไปแสดงข้อมูลทั้งหมด
    setFilteredDormList(dormList);
  };
  const selectLocation = ({ location }: { location: string }) => {
    setLocation(location);
    resetAllShw();
  };
  const selectPrice = ({ price }: { price: number }) => {
    setPrice(price);
    resetAllShw();
  };
  const selectType = ({ type }: { type: string }) => {
    setType(type);
    resetAllShw();
  };
  const selectDistance = ({ distance }: { distance: number }) => {
    setDistance(distance);
    resetAllShw();
  };

  //conveniences filter
  const handleFurniture = () => {
    setFurniture(!furniture);
  };
  const handlePet = () => {
    setAllowPet(!allowPet);
  };
  const handleWifi = () => {
    setWifi(!wifi);
  };
  const handleWater = () => {
    setWaterHeater(!waterHeater);
  };
  const handleAir = () => {
    setAir(!air);
  };

  return (
    <div className="flex w-full h-screen ">
      <section className="w-4/12 pl-4 pr-16">
        <div className="w-full flex justify-between items-center p-2 mb-5 mt-1">
          <span className="text-[22px]">Filters</span>
          <span
            className="text-[14px] text-indigo-500 cursor-pointer select-none transition-all duration-150 ease-in-out hover:text-indigo-700"
            onClick={resetAllValue}
          >
            Reset
          </span>
        </div>
        {/* filter row 1 */}
        <div className="flex h-1/6">
          {/* Location */}
          <div className="flex flex-col w-1/2 p-2">
            <label htmlFor="Location" className="text-[20px] mb-2 select-none">
              Location
            </label>
            <div
              className="relative flex flex-row items-center justify-between border p-2 rounded-md mb-2 cursor-pointer select-none"
              onClick={showLocation}
            >
              {location === "" ? (
                <span className="pl-2 text-slate-500">Select Location</span>
              ) : (
                <span className="pl-2">{location}</span>
              )}
              <svg
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.667 16.6665L20.0003 24.9998L28.3337 16.6665H11.667Z"
                  fill="black"
                />
              </svg>
              {shwLocation && (
                <div className="absolute -bottom-[225px] -left-0 w-full shadow-lg rounded-md bg-white z-10">
                  <ul>
                    {allLocation.map((item, index) => (
                      <li
                        className="text-black p-2 pl-3 rounded-md cursor-pointer select-none transition duration-100 ease-in hover:bg-yellow-200"
                        key={index}
                        onClick={() =>
                          selectLocation({ location: item.content })
                        }
                      >
                        {item.content}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* Price */}
          <div className="flex flex-col w-1/2 p-2">
            <label htmlFor="Price" className="text-[20px] mb-2 select-none">
              Price
            </label>
            <div
              className="relative flex flex-row items-center justify-between border p-2 rounded-md mb-2 cursor-pointer select-none"
              onClick={showPrice}
            >
              {price === 0 ? (
                <span className="pl-2 text-slate-500">Select Price</span>
              ) : (
                <span className="pl-2">Less than {price}</span>
              )}
              <svg
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.667 16.6665L20.0003 24.9998L28.3337 16.6665H11.667Z"
                  fill="black"
                />
              </svg>
              {shwPrice && (
                <div className="absolute -bottom-[125px] -left-0 w-full shadow-lg rounded-md bg-white z-10">
                  <ul>
                    {allPrice.map((item, index) => (
                      <li
                        className="text-black p-2 pl-3 rounded-md  cursor-pointer select-none transition duration-100 ease-in hover:bg-yellow-200"
                        key={index}
                        onClick={() => selectPrice({ price: item.price })}
                      >
                        {item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* filter row 2 */}
        <div className="flex h-1/6">
          {/* PropertyType */}
          <div className="flex flex-col w-1/2 p-2">
            <label
              htmlFor="PropertyType"
              className="text-[20px] mb-2 select-none"
            >
              Property Type
            </label>
            <div
              className="relative flex flex-row items-center justify-between border p-2 rounded-md mb-2 cursor-pointer select-none"
              onClick={showType}
            >
              {type === "" ? (
                <span className="pl-2 text-slate-500">Select Type</span>
              ) : (
                <span className="pl-2">{type}</span>
              )}
              <svg
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.667 16.6665L20.0003 24.9998L28.3337 16.6665H11.667Z"
                  fill="black"
                />
              </svg>
              {shwType && (
                <div className="absolute -bottom-[125px] -left-0 w-full shadow-lg rounded-md bg-white z-10">
                  <ul>
                    {allType.map((item, index) => (
                      <li
                        className="text-black p-2 pl-3 rounded-md cursor-pointer select-none transition duration-100 ease-in hover:bg-yellow-200"
                        key={index}
                        onClick={() => selectType({ type: item.content })}
                      >
                        {item.content}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* Distance */}
          <div className="flex flex-col w-1/2 p-2">
            <label htmlFor="Distance" className="text-[20px] mb-2 select-none">
              Distance
            </label>
            <div
              className="relative flex flex-row items-center justify-between border p-2 rounded-md mb-2 cursor-pointer select-none"
              onClick={showDistance}
            >
              {distance === 0 ? (
                <span className="pl-2 text-slate-500">Distance</span>
              ) : (
                <span className="pl-2">with in {distance} km</span>
              )}
              <svg
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.667 16.6665L20.0003 24.9998L28.3337 16.6665H11.667Z"
                  fill="black"
                />
              </svg>
              {shwDistance && (
                <div className="absolute -bottom-[125px] -left-0 w-full shadow-lg rounded-md bg-white z-10 ">
                  <ul>
                    {allDistance.map((item, index) => (
                      <li
                        className="text-black p-2 pl-3 rounded-md  cursor-pointer select-none transition duration-100 ease-in hover:bg-yellow-200"
                        key={index}
                        onClick={() =>
                          selectDistance({ distance: item.content })
                        }
                      >
                        {item.content} km
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* convenience Filter */}
        <div className="w-full flex-col mt-2 h-2/6">
          <span className="text-[20px]  select-none">Conveniences</span>

          {/* Furniture-allowpet */}
          <div className="flex mb-1 mt-2">
            <div
              className={`${furniture ? "bg-indigo-400 text-white border" : "bg-white shadow-md text-black border border-slate-200"} flex itmes-center justify-center rounded-lg p-2 w-1/2 m-1 cursor-pointer select-none transition duration-150 ease-in-out hover:-translate-y-0.5`}
              onClick={handleFurniture}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.00033 8H28.0003C28.7337 8 29.3337 8.6 29.3337 9.33333C29.3337 10.0667 28.7337 10.6667 
                                28.0003 10.6667V25.3333H25.3337V22.6667H20.0003V25.3333H17.3337V10.6667H6.66699V25.3333H4.00033V10.6667C3.26699 
                                10.6667 2.66699 10.0667 2.66699 9.33333C2.66699 8.6 3.26699 8 4.00033 8ZM21.3337 14V14.6667H24.0003V14C24.0003 
                                13.6267 23.707 13.3333 23.3337 13.3333H22.0003C21.627 13.3333 21.3337 13.6267 21.3337 14ZM21.3337 
                                19.3333V20H24.0003V19.3333C24.0003 18.96 23.707 18.6667 23.3337 18.6667H22.0003C21.627 18.6667 21.3337 
                                18.96 21.3337 19.3333Z"
                  fill={`${furniture ? "white" : "#999999"}`}
                />
              </svg>
              <div className="p-1 ml-2">Furniture</div>
            </div>
            <div
              className={`${allowPet ? "bg-indigo-400 text-white border" : "bg-white shadow-md text-black border border-slate-200"} flex itmes-center justify-center rounded-lg p-2 w-1/2 m-1 cursor-pointer select-none transition duration-150 ease-in-out hover:-translate-y-0.5`}
              onClick={handlePet}
            >
              <svg
                className="self-center"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.07143 2.35693C6.29357 2.35693 5.68386 2.82993 5.30671 3.39722C4.92486 3.96922 4.71429 4.71565 4.71429 5.49979C4.71429 6.28393 4.92486 7.03036 5.30671 7.60236C5.68386 8.16808 6.29357 8.64265 7.07143 8.64265C7.84929 8.64265 8.459 8.16965 8.83614 7.60236C9.218 7.03036 9.42857 6.28393 9.42857 5.49979C9.42857 4.71565 9.218 3.96922 8.83614 3.39722C8.459 2.8315 7.84929 2.35693 7.07143 2.35693ZM14.9286 2.35693C14.1507 2.35693 13.541 2.82993 13.1639 3.39722C12.782 3.96922 12.5714 4.71565 12.5714 5.49979C12.5714 6.28393 12.782 7.03036 13.1639 7.60236C13.541 8.16808 14.1507 8.64265 14.9286 8.64265C15.7064 8.64265 16.3161 8.16965 16.6933 7.60236C17.0751 7.03036 17.2857 6.28393 17.2857 5.49979C17.2857 4.71565 17.0751 3.96922 16.6933 3.39722C16.3161 2.8315 15.7064 2.35693 14.9286 2.35693ZM2.35714 9.42836C1.57929 9.42836 0.969571 9.90136 0.592429 10.4686C0.210571 11.0406 0 11.7871 0 12.5712C0 13.3554 0.210571 14.1018 0.592429 14.6738C0.969571 15.2395 1.57929 15.7141 2.35714 15.7141C3.135 15.7141 3.74471 15.2411 4.12186 14.6738C4.50371 14.1018 4.71429 13.3554 4.71429 12.5712C4.71429 11.7871 4.50371 11.0406 4.12186 10.4686C3.74471 9.90293 3.135 9.42836 2.35714 9.42836ZM11 9.42836C9.11429 9.42836 7.71729 10.4404 6.82471 11.6959C5.94314 12.9326 5.5 14.4679 5.5 15.7141C5.5 17.1661 6.37214 18.1749 7.44229 18.7815C8.49514 19.3786 9.81514 19.6426 11 19.6426C12.1849 19.6426 13.5049 19.3802 14.5577 18.7815C15.6263 18.1749 16.5 17.1661 16.5 15.7141C16.5 14.4679 16.0569 12.9326 15.1753 11.6959C14.2843 10.4388 12.8873 9.42836 11 9.42836ZM19.6429 9.42836C18.865 9.42836 18.2553 9.90136 17.8781 10.4686C17.4963 11.0406 17.2857 11.7871 17.2857 12.5712C17.2857 13.3554 17.4963 14.1018 17.8781 14.6738C18.2553 15.2395 18.865 15.7141 19.6429 15.7141C20.4207 15.7141 21.0304 15.2411 21.4076 14.6738C21.7894 14.1018 22 13.3554 22 12.5712C22 11.7871 21.7894 11.0406 21.4076 10.4686C21.0304 9.90293 20.4207 9.42836 19.6429 9.42836Z"
                  fill={`${allowPet ? "white" : "#999999"}`}
                />
              </svg>
              <div className="p-1 ml-2 self-center">Allow pet</div>
            </div>
          </div>

          {/* wifi-waterheater */}
          <div className="flex mb-1">
            <div
              className={`${wifi ? "bg-indigo-400 text-white border" : "bg-white shadow-md text-black border border-slate-200"} flex itmes-center justify-center rounded-lg p-2 w-2/5 m-1 cursor-pointer select-none transition duration-150 ease-in-out hover:-translate-y-0.5`}
              onClick={handleWifi}
            >
              <svg
                className="self-center"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21C11.3 21 10.7083 20.7583 10.225 20.275C9.74167 19.7917 9.5 19.2 9.5 18.5C9.5 17.8 9.74167 17.2083 10.225 16.725C10.7083 16.2417 11.3 16 12 16C12.7 16 13.2917 16.2417 13.775 16.725C14.2583 17.2083 14.5 17.8 14.5 18.5C14.5 19.2 14.2583 19.7917 13.775 20.275C13.2917 20.7583 12.7 21 12 21ZM6.35 15.35L4.25 13.2C5.23333 12.2167 6.38767 11.4377 7.713 10.863C9.03833 10.2883 10.4673 10.0007 12 10C13.5327 9.99933 14.962 10.291 16.288 10.875C17.614 11.459 18.768 12.2507 19.75 13.25L17.65 15.35C16.9167 14.6167 16.0667 14.0417 15.1 13.625C14.1333 13.2083 13.1 13 12 13C10.9 13 9.86667 13.2083 8.9 13.625C7.93333 14.0417 7.08333 14.6167 6.35 15.35ZM2.1 11.1L0 9C1.53333 7.43333 3.325 6.20833 5.375 5.325C7.425 4.44167 9.63333 4 12 4C14.3667 4 16.575 4.44167 18.625 5.325C20.675 6.20833 22.4667 7.43333 24 9L21.9 11.1C20.6167 9.81667 19.1293 8.81267 17.438 8.088C15.7467 7.36333 13.934 7.00067 12 7C10.066 6.99933 8.25367 7.362 6.563 8.088C4.87233 8.814 3.38467 9.818 2.1 11.1Z"
                  fill={`${wifi ? "white" : "#999999"}`}
                />
              </svg>
              <div className="p-1 ml-2 self-center">WI-FI</div>
            </div>
            <div
              className={`${waterHeater ? "bg-indigo-400 text-white border" : "bg-white shadow-md text-black border border-slate-200"} flex itmes-center justify-center rounded-lg p-2 w-3/5 m-1 cursor-pointer select-none transition duration-150 ease-in-out hover:-translate-y-0.5`}
              onClick={handleWater}
            >
              <svg
                className="self-center"
                width="22"
                height="22"
                viewBox="0 0 22 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.2875 10.53C7.2875 10.91 7.36221 11.28 7.51163 11.64C7.66104 12 7.87279 12.33 8.14688 12.63C8.19271 12.39 8.28438 12.1552 8.42188 11.9256C8.55937 11.696 8.73125 11.5008 8.9375 11.34L11 9.6L13.0281 11.37C13.2344 11.53 13.4063 11.72 13.5438 11.94C13.6813 12.16 13.7729 12.39 13.8188 12.63C14.0708 12.33 14.294 12.01 14.4884 11.67C14.6827 11.33 14.7803 10.97 14.7812 10.59C14.7822 10.21 14.7134 9.8448 14.575 9.4944C14.4366 9.144 14.2303 8.8192 13.9562 8.52C13.7042 8.62 13.4466 8.7 13.1835 8.76C12.9204 8.82 12.6509 8.85 12.375 8.85C11.6875 8.85 11.0573 8.68 10.4844 8.34C9.91146 8 9.47604 7.55 9.17813 6.99C8.90312 7.23 8.65104 7.4848 8.42188 7.7544C8.19271 8.024 7.99242 8.3092 7.821 8.61C7.64958 8.9108 7.51758 9.2208 7.425 9.54C7.33242 9.8592 7.28658 10.1892 7.2875 10.53ZM11 12.12L10.4156 12.63C10.324 12.71 10.2612 12.79 10.2272 12.87C10.1933 12.95 10.1759 13.04 10.175 13.14C10.175 13.34 10.2552 13.5 10.4156 13.62C10.576 13.74 10.7708 13.8 11 13.8C11.2292 13.8 11.424 13.74 11.5844 13.62C11.7448 13.5 11.825 13.34 11.825 13.14C11.825 13.04 11.808 12.95 11.7741 12.87C11.7402 12.79 11.677 12.71 11.5844 12.63L11 12.12ZM11 3.6V5.88C11 6.22 11.1375 6.5052 11.4125 6.7356C11.6875 6.966 12.0198 7.0808 12.4094 7.08C12.6615 7.08 12.8906 7.0152 13.0969 6.8856C13.3031 6.756 13.4865 6.6008 13.6469 6.42L13.8875 6.12C14.8271 6.58 15.5549 7.2052 16.071 7.9956C16.5871 8.786 16.8447 9.6508 16.8438 10.59C16.8438 11.99 16.2708 13.1752 15.125 14.1456C13.9792 15.116 12.6042 15.6008 11 15.6C9.39583 15.5992 8.03229 15.1092 6.90937 14.13C5.78646 13.1508 5.225 11.9608 5.225 10.56C5.225 9.02 5.78646 7.65 6.90937 6.45C8.03229 5.25 9.39583 4.3 11 3.6ZM2.75 24C1.99375 24 1.34658 23.7652 0.8085 23.2956C0.270416 22.826 0.000916667 22.2608 0 21.6V4.8C0 3.48 0.538542 2.35 1.61563 1.41C2.69271 0.47 3.9875 0 5.5 0H16.5C18.0125 0 19.3073 0.47 20.3844 1.41C21.4615 2.35 22 3.48 22 4.8V21.6C22 22.26 21.731 22.8252 21.1929 23.2956C20.6548 23.766 20.0072 24.0008 19.25 24H2.75ZM2.75 19.2V21.6H19.25V19.2C18.5625 19.2 18.0125 19.4 17.6 19.8C17.1875 20.2 16.3625 20.4 15.125 20.4C13.8875 20.4 13.0795 20.2 12.7009 19.8C12.3223 19.4 11.7553 19.2 11 19.2C10.2447 19.2 9.67771 19.4 9.29912 19.8C8.92054 20.2 8.1125 20.4 6.875 20.4C5.6375 20.4 4.82946 20.2 4.45087 19.8C4.07229 19.4 3.50533 19.2 2.75 19.2ZM6.875 18C7.63125 18 8.19867 17.8 8.57725 17.4C8.95583 17 9.76342 16.8 11 16.8C12.2366 16.8 13.0616 17 13.475 17.4C13.8884 17.8 14.4384 18 15.125 18C15.8116 18 16.3616 17.8 16.775 17.4C17.1884 17 18.0134 16.8 19.25 16.8V4.8C19.25 4.14 18.981 3.5752 18.4429 3.1056C17.9048 2.636 17.2572 2.4008 16.5 2.4H5.5C4.74375 2.4 4.09658 2.6352 3.5585 3.1056C3.02042 3.576 2.75092 4.1408 2.75 4.8V16.8C3.9875 16.8 4.79554 17 5.17413 17.4C5.55271 17.8 6.11967 18 6.875 18Z"
                  fill={`${waterHeater ? "white" : "#999999"}`}
                />
              </svg>
              <div className="self-center ml-2">Water Heater</div>
            </div>
          </div>

          {/* air conditioner */}
          <div className="flex mb-1 ">
            <div
              className={`${air ? "bg-indigo-400 text-white border" : "bg-white shadow-md text-black border border-slate-200"} flex itmes-center justify-center rounded-lg p-2 w-1/2 m-1 cursor-pointer select-none transition duration-150 ease-in-out hover:-translate-y-0.5`}
              onClick={handleAir}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22.5003 5C23.4948 5 24.4487 5.39509 25.1519 6.09835C25.8552 6.80161 26.2503 7.75544 26.2503 8.75V15C26.2503 15.9946 25.8552 16.9484 25.1519 17.6517C24.4487 18.3549 23.4948 18.75 22.5003 18.75H7.50029C6.50572 18.75 5.5519 18.3549 4.84864 17.6517C4.14537 16.9484 3.75029 15.9946 3.75029 15V8.75C3.75029 7.75544 4.14537 6.80161 4.84864 6.09835C5.5519 5.39509 6.50572 5 7.50029 5H22.5003ZM22.5003 7.5H7.50029C7.19412 7.50004 6.89862 7.61244 6.66982 7.81589C6.44103 8.01934 6.29486 8.29969 6.25904 8.60375L6.25029 8.75V15C6.25033 15.3062 6.36273 15.6017 6.56618 15.8305C6.76963 16.0593 7.04997 16.2054 7.35404 16.2413L7.50029 16.25V13.75C7.50033 13.4438 7.61273 13.1483 7.81618 12.9195C8.01963 12.6907 8.29997 12.5446 8.60404 12.5087L8.75029 12.5H21.2503C21.5565 12.5 21.852 12.6124 22.0807 12.8159C22.3095 13.0193 22.4557 13.2997 22.4915 13.6038L22.5003 13.75V16.25C22.8065 16.25 23.102 16.1376 23.3307 15.9341C23.5595 15.7307 23.7057 15.4503 23.7415 15.1462L23.7503 15V8.75C23.7502 8.44383 23.6378 8.14833 23.4344 7.91954C23.2309 7.69074 22.9506 7.54457 22.6465 7.50875L22.5003 7.5ZM20.0003 15H10.0003V16.25H20.0003V15ZM20.0003 8.75C20.3318 8.75 20.6497 8.8817 20.8842 9.11612C21.1186 9.35054 21.2503 9.66848 21.2503 10C21.2503 10.3315 21.1186 10.6495 20.8842 10.8839C20.6497 11.1183 20.3318 11.25 20.0003 11.25C19.6688 11.25 19.3508 11.1183 19.1164 10.8839C18.882 10.6495 18.7503 10.3315 18.7503 10C18.7503 9.66848 18.882 9.35054 19.1164 9.11612C19.3508 8.8817 19.6688 8.75 20.0003 8.75ZM12.5003 20C12.8318 20 13.1497 20.1317 13.3842 20.3661C13.6186 20.6005 13.7503 20.9185 13.7503 21.25V22.715C13.7497 23.709 13.3545 24.6622 12.6515 25.365L12.134 25.8838C11.8983 26.1114 11.5825 26.2374 11.2548 26.2346C10.927 26.2317 10.6135 26.1003 10.3818 25.8685C10.15 25.6368 10.0185 25.3232 10.0157 24.9955C10.0128 24.6678 10.1388 24.352 10.3665 24.1162L10.884 23.5987C11.1185 23.3644 11.2502 23.0465 11.2503 22.715V21.25C11.2503 20.9185 11.382 20.6005 11.6164 20.3661C11.8508 20.1317 12.1688 20 12.5003 20ZM16.2503 21.25C16.2503 20.9185 16.382 20.6005 16.6164 20.3661C16.8508 20.1317 17.1688 20 17.5003 20C17.8318 20 18.1497 20.1317 18.3842 20.3661C18.6186 20.6005 18.7503 20.9185 18.7503 21.25V22.715C18.7504 23.0465 18.8821 23.3644 19.1165 23.5987L19.634 24.1162C19.7534 24.2316 19.8487 24.3695 19.9142 24.522C19.9797 24.6745 20.0142 24.8385 20.0156 25.0045C20.017 25.1705 19.9854 25.3351 19.9226 25.4887C19.8597 25.6423 19.7669 25.7819 19.6495 25.8992C19.5322 26.0166 19.3926 26.1094 19.239 26.1723C19.0854 26.2351 18.9208 26.2668 18.7548 26.2653C18.5888 26.2639 18.4248 26.2294 18.2723 26.1639C18.1198 26.0984 17.9818 26.0031 17.8665 25.8838L17.349 25.3662C16.6457 24.6632 16.2505 23.7095 16.2503 22.715V21.25ZM7.50029 20C7.83181 20 8.14975 20.1317 8.38417 20.3661C8.61859 20.6005 8.75029 20.9185 8.75029 21.25V22.0163C8.75015 22.5409 8.58493 23.0523 8.27803 23.4779C7.97112 23.9035 7.5381 24.2217 7.04029 24.3875L5.39529 24.9362C5.08067 25.041 4.73733 25.0165 4.44079 24.8681C4.14425 24.7197 3.9188 24.4596 3.81404 24.145C3.70928 23.8304 3.73379 23.487 3.88217 23.1905C4.03056 22.894 4.29067 22.6685 4.60529 22.5638L6.25029 22.0163V21.25C6.25029 20.9185 6.38198 20.6005 6.6164 20.3661C6.85082 20.1317 7.16877 20 7.50029 20ZM21.2503 21.25C21.2503 20.9185 21.382 20.6005 21.6164 20.3661C21.8508 20.1317 22.1688 20 22.5003 20C22.8318 20 23.1497 20.1317 23.3842 20.3661C23.6186 20.6005 23.7503 20.9185 23.7503 21.25V22.0163L25.3953 22.5638C25.7099 22.6685 25.97 22.894 26.1184 23.1905C26.2668 23.487 26.2913 23.8304 26.1865 24.145C26.0818 24.4596 25.8563 24.7197 25.5598 24.8681C25.2632 25.0165 24.9199 25.041 24.6053 24.9362L22.9603 24.3863C22.4629 24.2206 22.0301 23.9027 21.7233 23.4776C21.4164 23.0526 21.2509 22.5418 21.2503 22.0175V21.25Z"
                  fill={`${air ? "white" : "#999999"}`}
                />
              </svg>
              <div className="p-1 ml-2">Air conditioner</div>
            </div>
          </div>
        </div>

        <button
          className="w-full bg-yellow-400 rounded-xl p-2 pr-4 text-[20px] select-none shadow-lg transition duration-150 ease-in-out hover:bg-yellow-300"
          onClick={handleApply}
        >
          Apply
        </button>
      </section>
      {/* map and result section */}
      <section className="w-8/12 h-screen mt-2 m-2 flex flex-col ">
        <div className="w-full h-2/5  rounded-xl overflow-hidden shadow-lg select-none">
          <GoogleMapsComponent
            dormList={filteredDormList}
            onDormSelect={setSelectedDorm}
          />
        </div>

        <div className="w-full h-3/5 mt-3 ">
          <span className="text-[22px] font-semibold select-none">
            {filteredDormList.length} Results
          </span>
          <div className="p-1 ">
            <DormSlider
              dormList={filteredDormList}
              selectedDorm={selectedDorm}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
