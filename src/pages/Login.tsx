// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className='text-3xl text-center text-white pb-5'>Secure Face</h1>
        <form className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <div className="flex space-x-4">
            <button
              type="button"
              className="w-1/2 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
            >
              Login
            </button>
            <button
              type="button"
              className="w-1/2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Login with Face
            </button>
          </div>

          <div className="flex justify-between text-white text-sm mt-4">
            <span className="cursor-pointer hover:text-gray-400"><Link to="/register" className="cursor-pointer hover:text-gray-400">
              Don't have an account? Register here
            </Link></span>
            <span className="cursor-pointer hover:text-gray-400">Forgot your password?</span>
          </div>
        </form>
      </div>
    </div>
  );
};

