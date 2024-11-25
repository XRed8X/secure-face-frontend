import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {Navbar} from './components/Navbar';
import { Login } from './pages/Login'
import { Register } from './pages/Register';
import  { UsersList } from './pages/UsersList';
import { UserProfile } from './pages/UserProfile';
import  { AccessLogs } from './pages/AccessLogs';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/UsersList" element={<UsersList />} />
        <Route path="/UserProfile/:userId" element={<UserProfile />} />
        <Route path="/AccessLogs" element={<AccessLogs />} />
      </Routes>
    </Router>
  );
}

export default App;
