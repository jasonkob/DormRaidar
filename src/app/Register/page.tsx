'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Field ${name} changed:`, value);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    setError('');
    setSuccess(false);
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      const error = 'Please fill in all fields';
      console.log('Validation error:', error);
      setError(error);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      const error = 'Passwords do not match';
      console.log('Validation error:', error);
      setError(error);
      return;
    }

    setLoading(true);
    console.log('Starting registration process...');

    // Prepare the request body in the correct format
    const requestBody = {
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        name: formData.name
      })
    };

    console.log('Request body:', requestBody);

    try {
      console.log('Sending request to API...');
      const response = await fetch('https://lj4cy0euba.execute-api.ap-southeast-1.amazonaws.com/prod/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      console.log('Registration successful!');
      setSuccess(true);
      
      console.log('Starting redirect timer...');
      setTimeout(() => {
        console.log('Redirecting to login page...');
        router.push('/login');
      }, 2000);

    } catch (err) {
      console.error('Registration error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during registration');
      }
    } finally {
      setLoading(false);
      console.log('Registration process completed');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link href="/login">
          <button className="text-black bg-amber-300 px-4 py-2 rounded-lg shadow-md mb-8">
            ← Back
          </button>
        </Link>

        {/* Logo and Title */}
        <div className="flex items-center gap-2 mb-8">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-black rounded-sm" style={{ clipPath: 'polygon(0 0, 80% 0, 80% 100%, 0 100%)' }}></div>
            <div className="absolute right-0 inset-y-0 w-2 bg-yellow-400"></div>
          </div>
          <h1 className="text-black text-xl font-semibold">Radar Dorm</h1>
        </div>

        {/* Form Header */}
        <div className="text-center mb-8">
          <h2 className="text-black text-2xl font-bold mb-2">Create your account !</h2>
          <p className="text-gray-600">Just a few quick details, and you&apos;ll be ready to go</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            Registration successful! Redirecting to login...
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-black block text-sm font-medium mb-1">Your Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                👤
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="name"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="text-black block text-sm font-medium mb-1">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                ✉️
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="text-black block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                🔒
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-black block text-sm font-medium mb-1">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                🔒
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Retype Password"
                className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`text-black w-full py-2 px-4 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-medium transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;