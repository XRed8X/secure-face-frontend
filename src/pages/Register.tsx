import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        email,
        username,
        password,
      });

      if (response.status === 201) {
        Swal.fire('Success', 'User registered successfully', 'success');
        // Redirigir al login o a otra página si es necesario
      }
    } catch (err) {
      Swal.fire('Error', 'Registration failed', 'error');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl text-center text-white pb-5">Register User</h1>
        <form className="space-y-6" onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex space-x-4 mb-6">
            <button
              type="submit"
              className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Register
            </button>
          </div>

          <div className="text-white text-sm mt-4 text-center">
            <span className="cursor-pointer hover:text-gray-400">
              <Link to="/" className="cursor-pointer hover:text-gray-400">
                Have an account? Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
