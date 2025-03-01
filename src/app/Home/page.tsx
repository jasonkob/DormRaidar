"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [location, setLocation] = useState("Select Location");
  const [price, setPrice] = useState(0);
  const [shwLocation, setShwLocation] = useState(false);
  const [shwPrice, setShwPrice] = useState(false);

  const allLocation = [
    { id: 1, content: "kmitl" },
    { id: 2, content: "kmutnb" },
    { id: 3, content: "kmutt" },
  ];

  const allPrice = [
    { id: 1, price: 4000 },
    { id: 2, price: 5000 },
    { id: 3, price: 6000 },
  ];

  const showLocation = () => {
    setShwPrice(false);
    setShwLocation(!shwLocation);
  };
  const showPrice = () => {
    setShwLocation(false);
    setShwPrice(!shwPrice);
  };

  const selectLocation = ({ location }: { location: string }) => {
    setLocation(location);
    setShwLocation(false);
  };
  const selectPrice = ({ price }: { price: number }) => {
    setPrice(price);
    setShwPrice(false);
  };

  // const handleExplore = ()=>{
  //     console.log('explore')
  // }

  return (
    <div className="bg-[url('/home.jpg')]  bg-cover bg-center h-screen w-full rounded-3xl opacity-90">
      <div className="flex h-1/4 w-full justify-center items-end">
        <div className="flex items-center bg-white px-4 pt-4  h-[110px] w-[900px] rounded-xl opacity-90">
          <section className="flex flex-col h-full w-4/12 ">
            <label
              htmlFor="Location"
              className="text-black text-[24px] font-bold mb-2 select-none "
            >
              Location
            </label>
            <div
              className="w-10/12 flex items-center border border-black rounded-md mb-3 cursor-pointer"
              onClick={showLocation}
            >
              <span className="mx-2 mr-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 11.5C11.337 11.5 10.7011 11.2366 10.2322 10.7678C9.76339 10.2989 9.5 9.66304 9.5 9C9.5 8.33696 9.76339 7.70107 10.2322 7.23223C10.7011 6.76339 11.337 6.5 12 6.5C12.663 6.5 13.2989 6.76339 13.7678 7.23223C14.2366 7.70107 14.5 8.33696 14.5 9C14.5 9.3283 14.4353 9.65339 14.3097 9.95671C14.1841 10.26 13.9999 10.5356 13.7678 10.7678C13.5356 10.9999 13.26 11.1841 12.9567 11.3097C12.6534 11.4353 12.3283 11.5 12 11.5ZM12 2C10.1435 2 8.36301 2.7375 7.05025 4.05025C5.7375 5.36301 5 7.14348 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 7.14348 18.2625 5.36301 16.9497 4.05025C15.637 2.7375 13.8565 2 12 2Z"
                    fill="black"
                  />
                </svg>
              </span>
              <span className="w-3/5 select-none text-black">{location}</span>
              <span className="ml-1">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.667 16.6665L20.0003 24.9998L28.3337 16.6665H11.667Z"
                    fill="black"
                  />
                </svg>
              </span>
            </div>
            {shwLocation && (
              <div className="bg-white border rounded-md w-10/12 ">
                <ul className="">
                  {allLocation.map((item, index) => (
                    <li
                      className="p-2 rounded-md pl-4 cursor-pointer select-none transition duration-100 ease-in hover:bg-yellow-200"
                      key={index}
                      onClick={() => selectLocation({ location: item.content })}
                    >
                      {item.content}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
          <section className="flex flex-col h-full w-4/12">
            <label
              htmlFor="Location"
              className="text-black text-[24px] font-bold mb-2 select-none"
            >
              Price
            </label>
            <div
              className="w-10/12 flex items-center border border-black rounded-md mb-3 cursor-pointer"
              onClick={showPrice}
            >
              <span className="mx-2 mr-4 ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.1369 4.72776L17.9669 6.55776C20.6559 9.24776 21.9999 10.5918 21.9999 12.2618C21.9999 13.9328 20.6559 15.2768 17.9669 17.9658C15.2769 20.6558 13.9329 21.9998 12.2619 21.9998C10.5919 21.9998 9.24687 20.6558 6.55787 17.9668L4.72787 16.1368C3.18287 14.5908 2.40987 13.8188 2.12287 12.8158C1.83487 11.8128 2.08087 10.7478 2.57287 8.61876L2.85587 7.39076C3.26887 5.59876 3.47587 4.70276 4.08887 4.08876C4.70187 3.47476 5.59887 3.26876 7.39087 2.85576L8.61887 2.57176C10.7489 2.08076 11.8129 1.83476 12.8159 2.12176C13.8189 2.40976 14.5919 3.18276 16.1369 4.72776ZM11.1459 14.3278C10.4729 13.6558 10.4779 12.6898 10.8809 11.9248C10.7811 11.7807 10.735 11.6062 10.7504 11.4316C10.7659 11.257 10.8421 11.0933 10.9657 10.969C11.0892 10.8447 11.2524 10.7677 11.4269 10.7512C11.6014 10.7347 11.7762 10.7798 11.9209 10.8788C12.2609 10.6988 12.6339 10.6028 13.0059 10.6068C13.2048 10.6086 13.3948 10.6894 13.5341 10.8314C13.6735 10.9733 13.7507 11.1648 13.7489 11.3638C13.747 11.5627 13.6662 11.7527 13.5242 11.892C13.3823 12.0314 13.1908 12.1086 12.9919 12.1068C12.7603 12.1153 12.5415 12.2148 12.3829 12.3838C11.9959 12.7708 12.0969 13.1588 12.2059 13.2678C12.3159 13.3768 12.7029 13.4778 13.0899 13.0908C13.8739 12.3068 15.2279 12.0468 16.0949 12.9138C16.7679 13.5868 16.7629 14.5528 16.3599 15.3178C16.459 15.4619 16.5046 15.6362 16.4889 15.8104C16.4731 15.9846 16.3969 16.1478 16.2735 16.2718C16.1501 16.3958 15.9873 16.4728 15.8131 16.4894C15.639 16.506 15.4645 16.4612 15.3199 16.3628C14.8711 16.609 14.3506 16.691 13.8479 16.5948C13.6529 16.5547 13.4819 16.4389 13.3724 16.2727C13.2628 16.1066 13.2238 15.9037 13.2639 15.7088C13.3039 15.5138 13.4198 15.3428 13.5859 15.2333C13.7521 15.1237 13.9549 15.0847 14.1499 15.1248C14.3269 15.1618 14.6129 15.1038 14.8579 14.8588C15.2449 14.4708 15.1439 14.0838 15.0349 13.9748C14.9249 13.8658 14.5379 13.7648 14.1509 14.1518C13.3669 14.9358 12.0129 15.1958 11.1459 14.3278ZM10.0199 10.2928C10.2056 10.107 10.3528 9.88649 10.4533 9.64382C10.5538 9.40114 10.6055 9.14105 10.6054 8.8784C10.6054 8.61575 10.5536 8.35568 10.453 8.11304C10.3525 7.8704 10.2051 7.64995 10.0194 7.46426C9.83361 7.27857 9.6131 7.13128 9.37043 7.03082C9.12775 6.93035 8.86766 6.87866 8.60501 6.87871C8.34236 6.87875 8.08229 6.93053 7.83965 7.03109C7.59701 7.13164 7.37656 7.279 7.19087 7.46476C6.81585 7.83991 6.60522 8.34866 6.60531 8.87911C6.60541 9.40956 6.81622 9.91824 7.19137 10.2933C7.56652 10.6683 8.07527 10.8789 8.60572 10.8788C9.13617 10.8787 9.64485 10.6679 10.0199 10.2928Z"
                    fill="black"
                  />
                </svg>
              </span>
              <span className="w-3/5  select-none text-black">
                {price ? "less than" : "Insert Price"}
                <span className="ml-2 text-black">{price ? price : ""}</span>
              </span>
              <span className="ml-1">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.667 16.6665L20.0003 24.9998L28.3337 16.6665H11.667Z"
                    fill="black"
                  />
                </svg>
              </span>
            </div>
            {shwPrice && (
              <div className="bg-white border rounded-md w-10/12">
                <ul className="">
                  {allPrice.map((item, index) => (
                    <li
                      className="p-2 rounded-md pl-4 cursor-pointer select-none transition duration-100 ease-in hover:bg-yellow-200"
                      key={index}
                      onClick={() => selectPrice({ price: item.price })}
                    >
                      {item.price}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
          <div className="w-4/12">
            <Link href="/FindDorm">
              <button className="text-black w-11/12 bg-yellow-300 p-2 rounded-lg text-[22px] font-bold shadow-md select-none transition duration-200 ease-in hover:bg-yellow-400 ">
                Explore
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="h-4/6 w-8/12 flex flex-col place-self-end items-center justify-center text-center overflow-hidden">
        <p className="text-[28px] text-white text-center mt-20">
          Discover your perfect dorm —
        </p>
        <p className="text-[18px] text-white self-center">
          your smart choice for a comfortable and connected <br /> student life!
        </p>
      </div>
    </div>
  );
}
