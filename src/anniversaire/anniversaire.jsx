import React, { useState, useEffect } from 'react';

const Anniversaires = () => {
  const [nom, setNom] = useState('');
  const [date, setDate] = useState('');
  const [listeAnniversaires, setListeAnniversaires] = useState([]);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    // Charger les données d'anniversaires depuis localStorage
    const savedAnniversaires = localStorage.getItem('listeAnniversaires');
    if (savedAnniversaires) {
      setListeAnniversaires(JSON.parse(savedAnniversaires));
    }

    // Vérifier les anniversaires à venir
    verifierAnniversairesAVenir();
  }, []);

  // Vérification des anniversaires à venir (dans les 7 prochains jours)
  const verifierAnniversairesAVenir = () => {
    const aujourdhui = new Date();
    const uneSemaine = new Date(aujourdhui);
    uneSemaine.setDate(aujourdhui.getDate() + 7);
    
    const anniversairesProches = listeAnniversaires.filter(anniv => {
      const dateAnniv = new Date(anniv.date);
      const dateAnnivCetteAnnee = new Date(
        aujourdhui.getFullYear(),
        dateAnniv.getMonth(),
        dateAnniv.getDate()
      );
      
      return dateAnnivCetteAnnee >= aujourdhui && dateAnnivCetteAnnee <= uneSemaine;
    });

    if (anniversairesProches.length > 0) {
      setNotification(`${anniversairesProches.length} anniversaire(s) à venir dans les 7 prochains jours !`);
    } else {
      setNotification('');
    }
  };

  const handleNomChange = (e) => setNom(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);

  const handleAjouterAnniversaire = (e) => {
    e.preventDefault();
    if (nom && date) {
      const nouvelAnniversaire = {
        id: Date.now(),
        nom,
        date,
      };
      
      const updatedAnniversaires = [...listeAnniversaires, nouvelAnniversaire];
      setListeAnniversaires(updatedAnniversaires);
      localStorage.setItem('listeAnniversaires', JSON.stringify(updatedAnniversaires));
      
      // Réinitialiser les champs
      setNom('');
      setDate('');
      
      // Vérifier si des notifications doivent être affichées
      verifierAnniversairesAVenir();
    } else {
      alert("Veuillez entrer un nom et une date.");
    }
  };

  const handleSupprimerAnniversaire = (id) => {
    const updatedAnniversaires = listeAnniversaires.filter(anniv => anniv.id !== id);
    setListeAnniversaires(updatedAnniversaires);
    localStorage.setItem('listeAnniversaires', JSON.stringify(updatedAnniversaires));
    verifierAnniversairesAVenir();
  };

  // Fonction pour calculer l'âge et les jours restants
  const calculerDetails = (dateAnniversaire) => {
    const aujourdhui = new Date();
    const dateNaissance = new Date(dateAnniversaire);
    
    // Calculer l'âge
    let age = aujourdhui.getFullYear() - dateNaissance.getFullYear();
    
    // Calculer le prochain anniversaire
    const prochainAnniversaire = new Date(
      aujourdhui.getFullYear(),
      dateNaissance.getMonth(),
      dateNaissance.getDate()
    );
    
    // Si l'anniversaire est déjà passé cette année, on calcule pour l'année prochaine
    if (prochainAnniversaire < aujourdhui) {
      prochainAnniversaire.setFullYear(aujourdhui.getFullYear() + 1);
      // L'âge sera l'âge actuel + 1 car on calcule pour l'année prochaine
    } else {
      // L'âge reste le même car on calcule pour cette année
    }
    
    // Calculer le nombre de jours restants
    const differenceTemps = prochainAnniversaire - aujourdhui;
    const joursRestants = Math.ceil(differenceTemps / (1000 * 60 * 60 * 24));
    
    return {
      age: prochainAnniversaire < aujourdhui ? age + 1 : age,
      joursRestants
    };
  };

  // Trier les anniversaires par ordre chronologique du prochain à venir
  const anniversairesTries = [...listeAnniversaires].sort((a, b) => {
    const detailsA = calculerDetails(a.date);
    const detailsB = calculerDetails(b.date);
    return detailsA.joursRestants - detailsB.joursRestants;
  });

  return (
    <>
      <h2>Anniversaires ! 🎂</h2>
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}
      <main className="anniversaires-container">
        <section className="anniversaires-form">
          <h3>Ajouter un anniversaire</h3>
          <form onSubmit={handleAjouterAnniversaire}>
            <div className="form-group">
              <label htmlFor="nom">Nom:</label>
              <input 
                type="text" 
                id="nom"
                value={nom} 
                onChange={handleNomChange} 
                placeholder="Nom de la personne" 
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date de naissance:</label>
              <input 
                type="date" 
                id="date"
                value={date} 
                onChange={handleDateChange} 
                required
              />
            </div>
            <button type="submit" className="btn-ajouter">Ajouter</button>
          </form>
        </section>

        <section className="anniversaires-liste">
          <h3>Liste des anniversaires</h3>
          {anniversairesTries.length > 0 ? (
            <ul>
              {anniversairesTries.map((anniv) => {
                const details = calculerDetails(anniv.date);
                const dateFormattee = new Date(anniv.date).toLocaleDateString('fr-FR');
                
                return (
                  <li key={anniv.id} className={details.joursRestants <= 7 ? 'anniversaire-proche' : ''}>
                    <div className="anniversaire-info">
                      <span className="anniversaire-nom">{anniv.nom}</span>
                      <span className="anniversaire-date">{dateFormattee}</span>
                      <span className="anniversaire-age">
                        {details.joursRestants === 0 
                          ? `Aujourd'hui ! (${details.age} ans)` 
                          : `Dans ${details.joursRestants} jour(s) (${details.age} ans)`
                        }
                      </span>
                    </div>
                    <button 
                      onClick={() => handleSupprimerAnniversaire(anniv.id)}
                      className="btn-supprimer"
                    >
                      Supprimer
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="message-vide">Aucun anniversaire enregistré.</p>
          )}
        </section>
      </main>
    </>
  );
};

export default Anniversaires;