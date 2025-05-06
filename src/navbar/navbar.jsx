import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '../images/home.jpg';
import CadeauxIcon from '../images/gift-box-icon-png-7.jpg';
import './Navbar.css';
import MenuNoel from '../menu/menu';
import ImgNoel from '../images/menuChristmas.jpg'
import { useNavigate } from 'react-router-dom';
import Anniversaires from '../anniversaire/anniversaire.jsx';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };  
  return (
    <div className="navbar">
      <Link to="/accueil" className="navbar-icon">
        <img src={HomeIcon} alt="Accueil" className="icon" />
      </Link>
      <Link to="/cadeaux" className="navbar-icon">
        <img src={CadeauxIcon} alt="Cadeaux" className="icon" />
      </Link>
      <Link to="/anniversaires" className="navbar-icon">
        Anniversaires
      </Link>
      <button style={{ padding: '0.8rem', backgroundColor: '#4CAF50', color: 'white', borderRadius: '5px' }} onClick={handleLogin}>
          Se connecter
      </button>
      
    </div>
  );
};

export default Navbar;
