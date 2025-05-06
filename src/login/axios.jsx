import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Vérifier si les champs sont remplis
    if (!email || !password) {
      setMessage('Veuillez entrer un email et un mot de passe.');
      return;
    }

    try {
      // Envoie de la requête POST au serveur
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      }, { withCredentials: true }); // Si tu utilises des cookies

      // Si la connexion est réussie, tu peux récupérer le token
      const { token } = response.data;
      setMessage('Connexion réussie ! Token : ' + token);
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Erreur de connexion.');
    }
  };

  return (
    <div>
      <h2>Se connecter</h2>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email :</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;

