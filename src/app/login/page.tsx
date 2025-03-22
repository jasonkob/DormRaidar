"use client";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // ตรวจสอบว่ามี token อยู่แล้วหรือไม่
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/Booked");
    }
    const tokenExpiry = localStorage.getItem("tokenExpiry");
if (token && (!tokenExpiry || new Date(tokenExpiry) <= new Date())) {
  // token หมดอายุ ให้ลบออก
  localStorage.removeItem("authToken");
  localStorage.removeItem("tokenExpiry");
  localStorage.removeItem("user");
  return;
}
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://5zvktmrcab.execute-api.ap-southeast-1.amazonaws.com/prod/login",
        {
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      console.log("Response:", response);

      if (response.status === 200) {
        console.log("Login successful:", response.data);

        // 1. เก็บ token ใน localStorage
        const token = response.data.token; // ปรับตามโครงสร้าง response ของคุณ
        localStorage.setItem("authToken", token);

        // 2. เก็บข้อมูลผู้ใช้
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        // 3. ถ้าเลือก "Remember me" ก็เก็บข้อมูลเพิ่มเติม
        if (formData.rememberMe) {
          localStorage.setItem("rememberMe", "true");
          // คุณสามารถกำหนดเวลาหมดอายุด้วย
          const expiry = new Date();
          expiry.setDate(expiry.getDate() + 30); // 30 วัน
          localStorage.setItem("tokenExpiry", expiry.toISOString());
        } else {
          localStorage.removeItem("rememberMe");
          const expiry = new Date();
          expiry.setDate(expiry.getDate() + 1); // 1 วัน
          localStorage.setItem("tokenExpiry", expiry.toISOString());
        }
        router.push("/Booked");
      } else {
        setErrorMessage("Invalid credentials");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("API Error:", error.response.data);
          setErrorMessage(error.response.data?.message || "An error occurred");
        } else {
          console.error("Axios Error without response:", error);
          setErrorMessage("An unexpected error occurred");
        }
      } else {
        console.error("Error:", error);
        setErrorMessage("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen bg-white p-6'>
      <Link href='/Home'>
        <button className='text-black bg-amber-300 px-4 py-2 rounded-lg shadow-md mb-8'>
          ← Back
        </button>
      </Link>

      <div className='max-w-md mx-auto'>
        <h2 className='text-black text-2xl font-bold text-center mb-2'>
          Login to your account
        </h2>
        <p className='text-gray-500 text-center mb-8'>
          Good to have you back! Log in and explore.
        </p>

        {errorMessage && (
          <div className='text-red-500 text-center mb-4'>{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='relative'>
            <Mail className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
            <input
              type='email'
              placeholder='Email'
              className='w-full pl-10 pr-4 py-2 border rounded-lg'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className='relative'>
            <Lock className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
            <input
              type={showPassword ? "text" : "password"}
              placeholder='Password'
              className='w-full pl-10 pr-12 py-2 border rounded-lg'
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type='button'
              className='absolute right-3 top-3'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className='h-5 w-5 text-gray-400' />
              ) : (
                <Eye className='h-5 w-5 text-gray-400' />
              )}
            </button>
          </div>

          <div className='flex items-center justify-between'>
            <label className='text-black flex items-center'>
              <input
                type='checkbox'
                className='mr-2'
                checked={formData.rememberMe}
                onChange={(e) =>
                  setFormData({ ...formData, rememberMe: e.target.checked })
                }
              />
              <span>Remember me</span>
            </label>
            <Link href='/forgot-password' className='text-blue-600'>
              Forget password?
            </Link>
          </div>

          <button
            type='submit'
            className='text-black w-full bg-amber-300 py-3 rounded-lg font-medium'
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <p className='text-center'>
            Don&apos;t have an account?{" "}
            <Link href='/register' className='text-blue-600'>
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default function Page() {
  return <LoginPage />;
}
