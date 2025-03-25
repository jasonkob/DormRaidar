'use client';
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

// Define a type for the user data based on actual API response
interface User {
  id: string;
  email: string;
  name: string;
}

// Define a type for the login form data
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Check if user is already logged in
  useEffect(() => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        console.log('User already logged in, redirecting to Home');
        router.push('/OwnerDashboard');
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);
    console.log('Form submitted with:', { email: formData.email });

    try {
      // Send login request with body format as expected by the API
      const response = await axios.post(
        'https://w7xvqc99tl.execute-api.ap-southeast-1.amazonaws.com/default/AdminLoginFunc',
        {
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      console.log('API Response:', response.data);

      if (response.status === 200) {
        // Store user data from response
        // Parse the response body if it's a string
        let userData: User;
        
        if (typeof response.data === 'string') {
          // If the response is a JSON string
          userData = JSON.parse(response.data);
        } else if (response.data.body && typeof response.data.body === 'string') {
          // If the response has a body property that's a JSON string
          userData = JSON.parse(response.data.body);
        } else if (response.data.body) {
          // If the response has a body property that's already an object
          userData = response.data.body as User;
        } else {
          // If the response is already an object
          userData = response.data as User;
        }
        
        console.log('Processed user data:', userData);
        
        // Store the user info in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Since there's no token in the response, we'll create one using the user ID
        // This is a workaround - in a real app, your backend should provide a proper token
        const mockToken = `user_session_${userData.id}`;
        localStorage.setItem('authToken', mockToken);
        
        // Handle "Remember me" option
        if (formData.rememberMe) {
          const expiry = new Date();
          expiry.setDate(expiry.getDate() + 30); // 30 days
          localStorage.setItem('tokenExpiry', expiry.toISOString());
        } else {
          const expiry = new Date();
          expiry.setDate(expiry.getDate() + 1); // 1 day
          localStorage.setItem('tokenExpiry', expiry.toISOString());
        }
        
        // Navigate to home page
        console.log('Login successful, redirecting to Home');
        
        // First try window.location for direct navigation
        window.location.href = '/OwnerDashboard';
        
        // Also use router as backup
        router.push('/OwnerDashboard');
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('Error response:', error.response.data);
          setErrorMessage(
            error.response.data?.message || 'Login failed. Please try again.'
          );
        } else {
          setErrorMessage('Network error. Please check your connection.');
        }
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <Link href="/Home">
        <button className="text-black bg-amber-300 px-4 py-2 rounded-lg shadow-md mb-8">
          ← Back
        </button>
        <Image className="w-40 h-30 mx-auto mb-7" src='/logo.png' alt="logo" width={160} height={120} />
      </Link>
      
      <div className="max-w-md mx-auto">
        <h2 className="text-black text-2xl font-bold text-center mb-2">Login to your Owner account</h2>
        <p className="text-gray-500 text-center mb-8">Good to have you back! Log in and explore.</p>

        {errorMessage && (
          <div className="text-red-500 text-center mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative max-w-sm mx-auto">
            <Mail className="absolute left-3 top-8 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full mt-5 pl-10 pr-4 py-2 border rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="relative max-w-sm mx-auto">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-12 py-2 border rounded-lg"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </button>
          </div>

          <div className="flex items-center justify-between max-w-sm mx-auto">
            <label className="text-black mb-7 flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              />
              <span>Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-blue-600 mb-7">Forget password?</Link>
          </div>

          <div className="relative max-w-sm mx-auto">
            <button 
              type="submit" 
              className="text-black w-full bg-amber-300 py-3 rounded-lg font-medium hover:bg-amber-400 transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
          <p className="text-center">
            Do not have an account?{" "}
            <Link href="/Register" className="text-blue-600 ml-3">
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