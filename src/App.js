import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Caminatas from "./components/Caminatas";
import Comidas from "./components/Comidas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/caminatas" element={<Caminatas />} />
        <Route path="/comidas" element={<Comidas />} />
      </Routes>
    </Router>
  );
}

export default App;
