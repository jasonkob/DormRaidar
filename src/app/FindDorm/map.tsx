'use client'
import { useEffect, useState, useRef } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

interface Dorm {
  name: string;
  image:string;
  price:number;
  location: { lat: number; lng: number };
}
interface mapProps {
  dormList: Dorm[];
  onDormSelect:(name:string) => void;
  }

const MAP_ID = "363ba87abcf1485b"; // Replace with your actual Map ID
const API_KEY = "AIzaSyB5siArqicvF4USAn4_e5pcxzL4sV_AoRE";

const containerStyle = { width: "100%", height: "500px" };
const center = { lat: 13.726300960028079, lng: 100.77034438039502 };

const GoogleMapsComponent: React.FC<mapProps>= ({dormList,onDormSelect}) => {

  const mapRef = useRef<google.maps.Map | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (!isMapLoaded || !mapRef.current || !window.google) return;

    dormList.forEach((dorm) => {
      if (dorm.image === null || dorm.image === undefined) return;
      const priceTag = document.createElement("div");
      priceTag.className = "price-tag";
      priceTag.textContent = `${dorm.price} ฿`; // Make sure `name` exists in JSON
      priceTag.style.zIndex = "100";
      priceTag.style.pointerEvents = "auto";

      const marker = new google.maps.marker.AdvancedMarkerElement({
        map: mapRef.current!,
        position: { lat: dorm.location.lat, lng: dorm.location.lng },
        content: priceTag,
        gmpClickable:true
      });

      marker.addListener("click", () => {
        console.log("Marker clicked:", dorm.name);
        onDormSelect(dorm.name);
      });
    });
  }, [isMapLoaded, dormList]);

  

  return (
    <>
    <LoadScript googleMapsApiKey={API_KEY} libraries={["marker"]}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={18}
        options={{ 
            mapId: MAP_ID,
            streetViewControl:true
        }}
        onLoad={(map) => {
          mapRef.current = map;
          setIsMapLoaded(true);
        }}
        onUnmount={() => {
          mapRef.current = null;
          setIsMapLoaded(false);
        }}
      />
    </LoadScript>
    <style jsx global>{`
        .price-tag {
          background-color: #4285f4;
          border-radius: 8px;
          color: #ffffff;
          font-size: 14px;
          padding: 10px 15px;
          position: relative;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .price-tag::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 100%;
          transform: translate(-50%, 0);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 8px solid #4285f4;
        }
      `}</style>
    </>
    )
  }


export default GoogleMapsComponent;

