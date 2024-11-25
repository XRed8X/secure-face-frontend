import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    if (authContext) {
      authContext.setIsAuthenticated(false);
      authContext.setUser(null);
    }
    navigate('/');
  };

  const isAuthenticated = authContext ? authContext.isAuthenticated : Boolean(localStorage.getItem('auth_token'));
  const user = authContext?.user ?? null;

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">Secure Face</Link>
        </div>

        <div className="hidden md:flex space-x-6">
          {!isAuthenticated ? (
            <>
              <Link to="/" className="text-white hover:text-red-600">Login</Link>
              <Link to="/Register" className="text-white hover:text-red-600">Register</Link>
            </>
          ) : (
            <>
              <Link to="/Dashboard" className="text-white hover:text-red-600">Dashboard</Link>
              <Link to="/UsersList" className="text-white hover:text-red-600">Users</Link>
              <Link to="/AccessLogs" className="text-white hover:text-red-600">Access Logs</Link>
              <button onClick={handleLogout} className="text-white hover:text-red-600">Logout</button>
            </>
          )}
        </div>

        {isAuthenticated && user && (
          <div className="flex items-center space-x-4">
            {user.profile_picture ? (
              <img src={user.profile_picture} alt={user.username} className="w-8 h-8 rounded-full" />
            ) : (
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white">
                {user.username[0].toUpperCase()}
              </div>
            )}
            <span className="text-white">{user.username}</span>
          </div>
        )}

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 text-white space-y-4 py-4">
          {!isAuthenticated ? (
            <>
              <Link to="/" className="block text-center hover:text-red-600">Login</Link>
              <Link to="/Register" className="block text-center hover:text-red-600">Register</Link>
            </>
          ) : (
            <>
              <Link to="/UsersList" className="block text-center hover:text-red-600">Users</Link>
              <Link to="/AccessLogs" className="block text-center hover:text-red-600">Access Logs</Link>
              <button onClick={handleLogout} className="block text-center hover:text-red-600 w-full">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
