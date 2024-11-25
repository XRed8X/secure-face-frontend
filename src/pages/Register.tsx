// src/pages/Register.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Register: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className='text-3xl text-center text-white pb-5'>Register User</h1>
        <form className="space-y-6">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          {/* Espacio en blanco donde se colocará la cámara */}
          <div className="h-40 bg-gray-700 rounded-lg mb-6">
            {/* Aquí puede ir el componente de cámara */}
          </div>

          {/* Botones */}
          <div className="flex space-x-4 mb-6">
            <button
              type="button"
              className="w-1/2 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
            >
              Open Camera
            </button>
            <button
              type="button"
              className="w-1/2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Take Picture
            </button>
          </div>

          <button
            type="button"
            className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Register
          </button>

          {/* Enlace para login */}
          <div className="text-white text-sm mt-4 text-center">
            <span className="cursor-pointer hover:text-gray-400"><Link to="/" className="cursor-pointer hover:text-gray-400">
              Have an account? Login
            </Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

