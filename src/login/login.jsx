import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // ou utilise ton instance si elle est bien configurée

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Veuillez entrer un email et un mot de passe.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });

      const { token, message } = response.data;

      // Stocker le token
      localStorage.setItem('authToken', token);

      setMessage(message);
      // Rediriger après quelques secondes
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      const msg = error.response?.data?.message || 'Erreur de connexion.';
      setMessage(msg);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '2rem' }}>
      <h2>Connexion</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Entrez votre email"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Entrez votre mot de passe"
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>

        <button
          type="submit"
          style={{ width: '100%', padding: '1rem', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;
