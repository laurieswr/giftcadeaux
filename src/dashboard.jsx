import React, { useEffect, useState } from 'react';
import api from './login/axios'; // Importer Axios configuré

function Dashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Envoie une requête GET protégée
        const response = await api.get('/profile'); // Route protégée par JWT
        setUserData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h1>Bienvenue, {userData.name}</h1>
          {/* Afficher plus d'informations de l'utilisateur */}
        </div>
      ) : (
        <p>Chargement des données...</p>
      )}
    </div>
  );
}

export default Dashboard;
