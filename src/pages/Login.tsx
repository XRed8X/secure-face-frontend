// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Realizamos la solicitud para el login
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password,
      });
  
      // Verificamos que el token esté presente en la respuesta
      const { token } = response.data;
      if (token) {
        // Guarda el token en localStorage
        localStorage.setItem('auth_token', token);
  
        console.log('Token received:', token); // Verifica que el token se haya guardado correctamente
  
        // Si el login es exitoso, mostramos el mensaje y redirigimos al dashboard
        Swal.fire({
          title: 'Login Successful!',
          text: 'Welcome back!',
          icon: 'success',
          confirmButtonText: 'Go to Dashboard',
        }).then(() => {
          navigate('/dashboard'); // Redirige al dashboard
        });
      } else {
        // Si no se recibe un token, mostramos el mensaje de error
        Swal.fire({
          title: 'Login Failed',
          text: 'Invalid credentials. Please try again.',
          icon: 'error',
          confirmButtonText: 'Retry',
        });
      }
    } catch (error) {
      // En caso de error en la solicitud de login
      Swal.fire({
        title: 'Error',
        text: 'An error occurred during login. Please try again later.',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    }
  };
  
  


  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl text-center text-white pb-5">Login</h1>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex space-x-4">
            <button
              type="button"
              className="w-1/2 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
              onClick={handleLogin}
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
            <span className="cursor-pointer hover:text-gray-400">
              <Link to="/register" className="cursor-pointer hover:text-gray-400">
                Don't have an account? Register here
              </Link>
            </span>
            <span className="cursor-pointer hover:text-gray-400">Forgot your password?</span>
          </div>
        </form>
      </div>
    </div>
  );
};
