import React, { useState } from 'react';

function AuthComponent() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Simulation d'une base de données locale (en mémoire)
  const [users, setUsers] = useState([
    { email: 'test@example.com', password: 'password123', name: 'Utilisateur Test' }
  ]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setMessage('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setMessage('Veuillez remplir tous les champs.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage('Le mot de passe doit contenir au moins 6 caractères.');
      setIsLoading(false);
      return;
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      setMessage('Un compte avec cet email existe déjà.');
      setIsLoading(false);
      return;
    }

    // Simuler un délai de réseau
    setTimeout(() => {
      // Ajouter le nouvel utilisateur
      const newUser = { email, password, name };
      setUsers([...users, newUser]);
      
      setMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      resetForm();
      
      // Basculer automatiquement vers la connexion après inscription
      setTimeout(() => {
        setIsLogin(true);
        setMessage('');
      }, 2000);
      
      setIsLoading(false);
    }, 1000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      setMessage('Veuillez entrer un email et un mot de passe.');
      setIsLoading(false);
      return;
    }

    // Simuler un délai de réseau
    setTimeout(() => {
      // Vérifier les identifiants
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Simuler la génération d'un token
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IiR7ZW1haWx9IiwiaWF0IjoxNjMwMDAwMDAwfQ.demo-token';
        
        setMessage(`Connexion réussie ! Bienvenue ${user.name}. Token: ${token.substring(0, 20)}...`);
        resetForm();
      } else {
        setMessage('Email ou mot de passe incorrect.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '2rem auto', 
      padding: '2rem',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      backgroundColor: '#fff'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ color: '#333', marginBottom: '1rem' }}>
          {isLogin ? 'Connexion' : 'Inscription'}
        </h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              padding: '0.5rem 1rem',
              marginRight: '0.5rem',
              backgroundColor: isLogin ? '#4CAF50' : '#f0f0f0',
              color: isLogin ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Connexion
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: !isLogin ? '#4CAF50' : '#f0f0f0',
              color: !isLogin ? 'white' : '#333',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Inscription
          </button>
        </div>
      </div>

      {message && (
        <div style={{ 
          padding: '1rem', 
          marginBottom: '1rem', 
          backgroundColor: message.includes('réussie') || message.includes('Bienvenue') ? '#d4edda' : '#f8d7da',
          color: message.includes('réussie') || message.includes('Bienvenue') ? '#155724' : '#721c24',
          border: '1px solid ' + (message.includes('réussie') || message.includes('Bienvenue') ? '#c3e6cb' : '#f5c6cb'),
          borderRadius: '4px'
        }}>
          {message}
        </div>
      )}

      <div>
        {!isLogin && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Nom complet :
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLogin}
              placeholder="Entrez votre nom complet"
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Email :
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Entrez votre email"
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Mot de passe :
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Entrez votre mot de passe"
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        {!isLogin && (
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Confirmer le mot de passe :
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={!isLogin}
              placeholder="Confirmez votre mot de passe"
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '1rem'
              }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          style={{ 
            width: '100%', 
            padding: '1rem', 
            backgroundColor: isLoading ? '#ccc' : '#4CAF50', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          {isLoading ? 'Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire")}
        </button>
      </div>

      {/* Compte de test pour démonstration */}
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: '#f8f9fa', 
        border: '1px solid #dee2e6',
        borderRadius: '4px',
        fontSize: '0.9rem'
      }}>
        <strong>Compte de test disponible :</strong><br />
        Email: test@example.com<br />
        Mot de passe: password123
      </div>
    </div>
  );
}

export default AuthComponent;