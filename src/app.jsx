import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Accueil from './accueil/accueil';
import Cadeaux from './cadeaux/cadeaux';
import Footer from './footer/footer';
import Navbar from './navbar/navbar';
import Menu from './menu/menu';
import Header from './header/header';
import Login from './login/login';
import Dashboard from './dashboard.jsx';
import './app.css';
import Anniversaires from './anniversaire/anniversaire.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />

        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/cadeaux" element={<Cadeaux />} />
          <Route path="/footer" element={<Footer />} />
          <Route path='/menu' element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/anniversaires" element={<Anniversaires />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;