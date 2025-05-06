import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// ✅ CORS configuré correctement
app.use(cors({
  origin: 'http://localhost:5173', // le port de ton app React
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

let users = [
  { email: 'test@example.com', password: '123456', token: 'fake-jwt-token-123' }
];

// ✅ Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ token: user.token, message: 'Connexion réussie.' });
  } else {
    res.status(401).json({ message: 'Email ou mot de passe incorrect.' });
  }
});

// ✅ Register
app.post('/register', (req, res) => {
  const { email, password } = req.body;
  const exists = users.find(u => u.email === email);

  if (exists) {
    res.status(409).json({ message: 'Cet utilisateur existe déjà.' });
  } else {
    const newUser = { email, password, token: `token-${Date.now()}` };
    users.push(newUser);
    res.status(201).json({ token: newUser.token, message: 'Inscription réussie.' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur backend en écoute sur http://localhost:${PORT}`);
});
