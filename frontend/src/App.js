import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import RoleSelect from './pages/RoleSelect';
import HowItWorks from './pages/HowItWorks';
import RoundSelect from './pages/RoundSelect';
import Interview from './pages/Interview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/role-select" element={<RoleSelect />} />
        <Route path="/round-select/:roleId" element={<RoundSelect />} />
        <Route path="/interview/:roleId/:roundType" element={<Interview />} />
        <Route path="/interview/:roleId/:roundType" element={<div>Interview page coming soon</div>} />
        
      </Routes>
    </Router>
  );
}

export default App;