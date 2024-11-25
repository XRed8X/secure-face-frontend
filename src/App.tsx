import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { Register } from './pages/Register'; 
import { UsersList } from './pages/UsersList'; 
import { UserProfile } from './pages/UserProfile'; 
import { AccessLogList } from './pages/AccessLogs';
import { Dashboard } from './pages/Dashboard';

function App() {
  const authContext = useContext(AuthContext);

  // Usar AuthContext para isAuthenticated si está disponible, de lo contrario verificar en localStorage
  const isAuthenticated = authContext ? authContext.isAuthenticated : Boolean(localStorage.getItem('auth_token'));

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        {/* Las siguientes rutas están protegidas y solo se muestran si el usuario está autenticado */}
        <Route 
          path="/UsersList" 
          element={isAuthenticated ? <UsersList /> : <Navigate to="/" />} 
        />
        <Route 
          path="/UserProfile/:userId" 
          element={isAuthenticated ? <UserProfile /> : <Navigate to="/" />} 
        />
        <Route 
          path="/AccessLogs" 
          element={isAuthenticated ? <AccessLogList /> : <Navigate to="/" />} 
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
