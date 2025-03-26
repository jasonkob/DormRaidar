'use client';

import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { v4 as uuidv4 } from 'uuid';

export default function PropertyForm() {
  const [formData, setFormData] = useState({
    name: '',
    room: '',
    address: '',
    price: '',
    floor: '',
    phone: '',
    location_area: 'Keki Ngam 1',
    location: {
      lat: 13.7262826,
      lng: 100.769815
    },
    convenience: [] as string[],
    rules: [] as string[],
    ownerId: '', // Will be populated from localStorage
    image: '' // Single image URL
  });

  // Get userId from localStorage when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user?.id;
      if (userId) {
        setFormData(prev => ({ ...prev, ownerId: userId }));
      }
    }
  }, []);

  const [mapCenter, setMapCenter] = useState({
    lat: 13.7262826,
    lng: 100.769815
  });

  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const locationAreas = [
    "Keki Ngam 1",
    "Keki Ngam 2",
    "Keki Ngam 3",
    "Chalong Krung",
    "Chalong Krung 1",
    "Lat Krabang",
    "RNP Area"
  ];

  const conveniences = [
    { id: "furniture", label: "Furniture" },
    { id: "allowpet", label: "Pet-Friendly" },
    { id: "air conditioner", label: "Air-conditioner" },
    { id: "wifi", label: "Wi-Fi" },
    { id: "water heater", label: "Water Heater" }
  ];

  const rules = [
    { id: "cooking", label: "Cooking Allowed" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (category: 'convenience' | 'rules', id: string) => {
    const updatedCategory = formData[category].includes(id)
      ? formData[category].filter(item => item !== id)
      : [...formData[category], id];

    setFormData({
      ...formData,
      [category]: updatedCategory
    });
  };

  const handleLocationChange = (location: google.maps.LatLng) => {
    setFormData({
      ...formData,
      location: {
        lat: location.lat(),
        lng: location.lng()
      }
    });
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    const clickedLocation = {
      lat: e.latLng ? e.latLng.lat() : formData.location.lat,
      lng: e.latLng ? e.latLng.lng() : formData.location.lng
    };
    
    setFormData({
      ...formData,
      location: clickedLocation
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;
  
    setUploading(true);
  
    try {
      // ใช้ลิงก์ภาพที่กำหนดไว้
      const imageUrl = "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSdA1QNc3tYlfIEB007D7zAUzGlvc-d_9iye79OcNWmPXta6Rg9F8Y88PcIqmO-aK596xOVryX4AYQ6usX4GyA";
      
      setFormData({
        ...formData,
        image: imageUrl // กำหนดลิงก์ภาพใน state
      });
      
    } catch (error) {
      console.error("Error handling image:", error);
      alert("Failed to handle image. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  

  // แก้ไขเฉพาะส่วนนี้ในฟังก์ชัน handleSubmit
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  // Check if userId is available
  if (!formData.ownerId) {
    alert("User ID not found. Please log in again.");
    setIsSubmitting(false);
    return;
  }

  try {
    // คำนวณระยะทาง (ตัวอย่าง - คุณอาจจะต้องสร้างการคำนวณที่เหมาะสม)
    const distanceFromReference = 682.42; // ตัวอย่างระยะทาง

    // เตรียมข้อมูลสำหรับส่งไปยัง API Gateway/Lambda ในรูปแบบที่ DynamoDB ต้องการ
    const dynamoDBData = {
      name: {
        S: formData.name
      },
      address: {
        S: formData.address
      },
      convenience: {
        L: formData.convenience.map(item => ({
          S: item
        }))
      },
      distance_from_reference_m: {
        N: distanceFromReference.toString()
      },
      floor: {
        N: formData.floor.toString()
      },
      image: {
        S: formData.image
      },
      location: {
        M: {
          lat: {
            N: formData.location.lat.toString()
          },
          lng: {
            N: formData.location.lng.toString()
          }
        }
      },
      location_area: {
        S: formData.location_area
      },
      ownerId: {
        S: formData.ownerId
      },
      phone: {
        S: formData.phone
      },
      price: {
        N: formData.price.toString()
      },
      room: {
        S: formData.room
      }
    };
    
    // แสดง JSON ที่กำลังจะส่งไปยัง API ใน console
    console.log('Sending formatted data to DynamoDB:');
    console.log(JSON.stringify(dynamoDBData, null, 2));
    
    const response = await fetch(
      "https://9f9tfunlc7.execute-api.ap-southeast-1.amazonaws.com/default/SaveDormitoryData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dynamoDBData)
      }
    );

    // อ่านข้อความตอบกลับเพื่อการ debug
    const responseText = await response.text();
    console.log('API Response:', responseText);
    
    if (!response.ok) {
      throw new Error(`Failed to save property data: ${responseText}`);
    }

    alert("Property data saved successfully!");
    // Reset form or redirect
    setFormData({
      name: "",
      room: "",
      address: "",
      price: "",
      floor: "",
      phone: "",
      location_area: "Keki Ngam 1",
      location: {
        lat: 13.7262826,
        lng: 100.769815,
      },
      convenience: [],
      rules: [], // Keep `rules` in the UI but do not submit it
      ownerId: formData.ownerId, // Keep the ownerId
      image: "",
    });
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to save property data. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  const mapContainerStyle = {
    width: '100%',
    height: '300px'
  };

  // Replace with your actual Google Maps API Key
  const googleMapsApiKey = "AIzaSyB5siArqicvF4USAn4_e5pcxzL4sV_AoRE";

  return (
    <div className="bg-gray-100 flex justify-center items-center min-h-screen py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Dormitory Information</h1>

        <form onSubmit={handleSubmit}>
          {/* Unit Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Unit information</h2>
            <div className="grid grid-cols-2 gap-4">
              <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Dormitory name" 
                className="border p-2 rounded w-full"
                required 
              />
              <input 
                type="text" 
                name="room" 
                value={formData.room}
                onChange={handleInputChange}
                placeholder="Room number" 
                className="border p-2 rounded w-full" 
              />
            </div>
            <input 
              type="text" 
              name="address" 
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address" 
              className="border p-2 rounded w-full mt-3"
              required 
            />
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area
              </label>
              <select
                name="location_area"
                value={formData.location_area}
                onChange={handleInputChange}
                className="border p-2 rounded w-full"
                required
              >
                {locationAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Floor
              </label>
              <input
                type="number"
                name="floor"
                value={formData.floor}
                onChange={handleInputChange}
                placeholder="Floor number"
                className="border p-2 rounded w-full"
                min="1"
                required
              />
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Contact phone number"
                className="border p-2 rounded w-full"
                required
              />
            </div>
          </div>

          {/* Location Map */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Location (Click to set)</h2>
            <LoadScript googleMapsApiKey={googleMapsApiKey}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={mapCenter}
                zoom={15}
                onClick={handleMapClick}
              >
                <Marker position={formData.location} />
              </GoogleMap>
            </LoadScript>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Latitude</label>
                <input
                  type="text"
                  value={formData.location.lat}
                  readOnly
                  className="border p-2 rounded w-full bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Longitude</label>
                <input
                  type="text"
                  value={formData.location.lng}
                  readOnly
                  className="border p-2 rounded w-full bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Upload Image */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Unit image</h2>
            <div className="mt-2">
              <label 
                className={`border-dashed border-2 ${
                  formData.image ? 'border-green-300 bg-green-50' : 'border-gray-300'
                } rounded flex flex-col items-center justify-center p-4 cursor-pointer h-32 w-32`}
              >
                <input 
                  type="file" 
                  className="hidden"
                  accept="image/*" 
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {formData.image ? (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-cover bg-center rounded" 
                      style={{backgroundImage: `url(${formData.image})`}}></div>
                    <span className="text-green-600 text-sm mt-2">Uploaded</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-500 text-sm mt-2">{uploading ? 'Uploading...' : 'Upload image'}</span>
                  </div>
                )}
              </label>
              {!formData.image && <p className="text-xs text-gray-500 mt-1">Required: Upload a main image</p>}
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Price</h2>
            <div className="flex items-center">
              <input 
                type="number" 
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="Monthly rent" 
                className="border p-2 rounded w-full"
                min="0"
                required
              />
              <span className="ml-2 text-gray-600">/month</span>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Additional information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Facilities</h3>
                {conveniences.map((item) => (
                  <label key={item.id} className="block mb-1">
                    <input 
                      type="checkbox" 
                      checked={formData.convenience.includes(item.id)}
                      onChange={() => handleCheckboxChange('convenience', item.id)}
                      className="mr-2" 
                    /> 
                    {item.label}
                  </label>
                ))}
              </div>
              <div>
                <h3 className="font-semibold mb-2">Rules</h3>
                {rules.map((item) => (
                  <label key={item.id} className="block mb-1">
                    <input 
                      type="checkbox" 
                      checked={formData.rules.includes(item.id)}
                      onChange={() => handleCheckboxChange('rules', item.id)}
                      className="mr-2" 
                    /> 
                    {item.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
          <button 
          type="button"
          onClick={() => window.location.href = "/OwnerDashboard"}
          className="bg-red-400 text-white py-2 px-6 rounded hover:bg-red-500 transition"
          disabled={isSubmitting}
            >
            Back
            </button>

            <button 
              type="submit"
              className="bg-yellow-400 text-black py-2 px-6 rounded hover:bg-yellow-500 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Confirm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}