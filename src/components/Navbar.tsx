import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Función para manejar la apertura y cierre del menú en dispositivos móviles
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo o Título del sitio */}
        <div className="text-white text-2xl font-bold">
          <Link to="/">Control de Acceso</Link>
        </div>

        {/* Menú en pantallas grandes */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-red-600">Login</Link>
          <Link to="/Register" className="text-white hover:text-red-600">Register</Link>
          <Link to="/UsersList" className="text-white hover:text-red-600">Users</Link>
          <Link to="/AccessLogs" className="text-white hover:text-red-600">Access Logs</Link>
        </div>

        {/* Icono de menú (Hamburguesa) para pantallas pequeñas */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Menú en pantallas pequeñas */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black text-white space-y-4 py-4">
          <Link to="/" className="block text-center hover:text-red-600">Home</Link>
          <Link to="/Register" className="block text-center hover:text-red-600">Register</Link>
          <Link to="/UsersList" className="block text-center hover:text-red-600">Users</Link>
          <Link to="/AccessLogs" className="block text-center hover:text-red-600">Access Logs</Link>
        </div>
      )}
    </nav>
  );
};
