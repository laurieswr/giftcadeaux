import React, { useState, useEffect } from 'react';
import './cadeau.css';
import corbeilleImage from '../images/corbeille.jpg';

const Cadeaux = () => {
  const [cadeau, setCadeau] = useState('');
  const [prix, setPrix] = useState('');
  const [destinataire, setDestinataire] = useState('');
  const [nouveauDestinataire, setNouveauDestinataire] = useState('');
  const [destinataires, setDestinataires] = useState([]); // Liste initiale vide
  const [listeCadeaux, setListeCadeaux] = useState({});
  const [warning, setWarning] = useState(''); // État pour gérer le message d'avertissement

  useEffect(() => {
    // Charger les données de listeCadeaux depuis localStorage ou depuis le fichier JSON
    const savedCadeaux = localStorage.getItem('listeCadeaux');
    if (savedCadeaux) {
      setListeCadeaux(JSON.parse(savedCadeaux));
    } else {
      setListeCadeaux(listeCadeaux);
    }

    // Charger les destinataires depuis localStorage
    const savedDestinataires = localStorage.getItem('destinataires');
    if (savedDestinataires) {
      setDestinataires(JSON.parse(savedDestinataires));
      setDestinataire(JSON.parse(savedDestinataires)[0]); // Définit le premier destinataire par défaut s'il y a des destinataires
    }
  }, []);

  const handleCadeauChange = (e) => setCadeau(e.target.value);
  const handlePrixChange = (e) => {
    const prixValue = e.target.value;
    setPrix(prixValue);

    // Vérifie si le prix dépasse 50€
    if (parseFloat(prixValue) > 50) {
      setWarning('Le prix ne doit pas dépasser 50€ !');
    } else {
      setWarning(''); // Efface le message d'avertissement si le prix est valide
    }
  };
  const handleDestinataireChange = (e) => setDestinataire(e.target.value);

  const handleAjouterDestinataire = (e) => {
    e.preventDefault();
    if (nouveauDestinataire && !destinataires.includes(nouveauDestinataire)) {
      const updatedDestinataires = [...destinataires, nouveauDestinataire];
      setDestinataires(updatedDestinataires);
      setDestinataire(nouveauDestinataire); // Définit le nouveau destinataire comme sélectionné
      setNouveauDestinataire('');
      localStorage.setItem('destinataires', JSON.stringify(updatedDestinataires)); // Sauvegarder dans localStorage
    } else {
      alert("Veuillez entrer un nom valide ou ce destinataire existe déjà.");
    }
  };

  const handleSupprimerDestinataire = (dest) => {
    const updatedDestinataires = destinataires.filter((d) => d !== dest);
    setDestinataires(updatedDestinataires);
    setListeCadeaux((prevListe) => {
      const updatedListe = { ...prevListe };
      delete updatedListe[dest]; // Supprime les cadeaux de ce destinataire
      return updatedListe;
    });
    localStorage.setItem('destinataires', JSON.stringify(updatedDestinataires)); // Sauvegarder dans localStorage
    localStorage.setItem('listeCadeaux', JSON.stringify(listeCadeaux)); // Sauvegarder dans localStorage
  };

  const handleAjouterCadeau = (e) => {
    e.preventDefault();
    const prixNumerique = parseFloat(prix);
    if (cadeau && prix && prixNumerique <= 50) {
      const updatedListeCadeaux = { ...listeCadeaux };
      if (!updatedListeCadeaux[destinataire]) {
        updatedListeCadeaux[destinataire] = [];
      }
      updatedListeCadeaux[destinataire].push({ cadeau, prix: prixNumerique });
      setListeCadeaux(updatedListeCadeaux);
      localStorage.setItem('listeCadeaux', JSON.stringify(updatedListeCadeaux));
      setCadeau('');
      setPrix('');
      setWarning(''); // Réinitialise l'avertissement après ajout réussi
    } else {
      alert("Veuillez entrer un cadeau, un prix valide (maximum 50€).");
    }
  };

  const handleSupprimerCadeau = (dest, index) => {
    // Supprimer un cadeau spécifique par son index
    const updatedListeCadeaux = { ...listeCadeaux };
    updatedListeCadeaux[dest] = updatedListeCadeaux[dest].filter((_, i) => i !== index);
    setListeCadeaux(updatedListeCadeaux);
    localStorage.setItem('listeCadeaux', JSON.stringify(updatedListeCadeaux)); // Sauvegarder dans localStorage
  };

  const handleClear = () => {
    const clearedListeCadeaux = {};
    destinataires.forEach(dest => {
      clearedListeCadeaux[dest] = []; // Réinitialiser les cadeaux pour chaque destinataire
    });
    setListeCadeaux(clearedListeCadeaux);
    localStorage.setItem('listeCadeaux', JSON.stringify(clearedListeCadeaux)); // Sauvegarder dans localStorage
  };

  return (
    <>
    <h2>Cadeaux ! 🎁</h2>
    <main>
        <section className="affichage-left">
          <strong className='destinataire'>Ajouter un nouveau destinataire :</strong>
          <input 
            type="text" 
            value={nouveauDestinataire} 
            onChange={(e) => setNouveauDestinataire(e.target.value)} 
            placeholder="Ajouter un nouveau destinataire" 
          />
          <button onClick={handleAjouterDestinataire}>Ajouter Destinataire</button>
          <br /><br />
          <form onSubmit={handleAjouterCadeau}>
            <select value={destinataire} onChange={handleDestinataireChange} disabled={destinataires.length === 0}>
              {destinataires.map((dest, index) => (
                <option key={index} value={dest}>{dest.charAt(0).toUpperCase() + dest.slice(1)}</option>
              ))}
            </select>
            <br />
            <input type="text" value={cadeau} onChange={handleCadeauChange} placeholder='Idée de cadeau' />
            <br />
            {/* Affiche un message d'avertissement si nécessaire */}
            {warning && <p style={{ color: 'red' }}>{warning}</p>}
            <input type="text" value={prix} onChange={handlePrixChange} placeholder='Prix du cadeau' />
            <br />
            <button type="submit">Ajouter</button>
          </form>
        </section>

        <section className="affichage-right">
          {/* Affichage des cadeaux par destinataire */}
          {destinataires.map((dest) => (
            <div key={dest}>
              <p className='destinataire'><strong>Affichage des cadeaux pour {dest.charAt(0).toUpperCase() + dest.slice(1)} :</strong></p>
              <ul>
                {(listeCadeaux[dest] || []).map((item, index) => (
                  <li key={index}>
                    {item.cadeau} - {item.prix} € 
                    <button onClick={() => handleSupprimerCadeau(dest, index)} style={{ marginLeft: '10px' }}>Supprimer le cadeau</button>
                  </li>
                ))}
              </ul>
              <button id='supprimer' onClick={() => handleSupprimerDestinataire(dest)}>Supprimer {dest.charAt(0).toUpperCase() + dest.slice(1)}</button>
              <button onClick={handleClear} className='clear-button'>Effacer les cadeaux</button>
            </div>
          ))}
        </section>
    </main>
    </>
  );
};

export default Cadeaux;
