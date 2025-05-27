import React from 'react';
import './accueil.css';

const Accueil = () => {
  return (
    <div>
      <div className='accueilText'>
        <p>
          Bienvenue sur notre site dédié aux célébrations et aux moments partagés ! 🎉
        </p>
        <p>
          Ici, vous pouvez organiser les cadeaux que vous souhaitez offrir à vos proches pour toutes les occasions : anniversaires, fêtes de fin d'année, mariages, ou tout autre événement spécial.
        </p>
      </div>
      
      <div className='accueilText'>
        <p>
          Découvrez aussi une sélection d’entrées, plats et desserts avec leurs recettes, pour préparer des repas festifs mémorables.
        </p>
        <p>
          Envie d’un moment détente ? Parcourez notre liste de films à regarder pendant vos temps libres ou lors de soirées en famille.
        </p>
      </div>

      <div className='accueilText'>
        <p>
          Et en vous connectant, vous pourrez accéder à votre espace personnel pour gérer vos envies, vos idées de recettes, et bien plus encore !
        </p>
      </div>
    </div>
  );
};

export default Accueil;