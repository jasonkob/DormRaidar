'use client';
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Link from 'next/link';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <Link href="/">
      <button className="bg-amber-300 px-4 py-2 rounded-lg shadow-md mb-8">
        ← Back
      </button>
      </Link>
      
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">Login to your account</h2>
        <p className="text-gray-500 text-center mb-8">Good to have you back! Log in and explore.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-10 pr-12 py-2 border rounded-lg"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
              />
              <span>Remember me</span>
            </label>
            <Link href="#" className="text-blue-600">Forget password?</Link>
          </div>

          <button type="submit" className="w-full bg-amber-300 py-3 rounded-lg font-medium">Login</button>
          <p className="text-center"><Link href="#" className="text-blue-600">Create Account</Link></p>
        </form>
      </div>
    </div>
  );
};

export default function Page() {
  return <LoginPage />;
}
