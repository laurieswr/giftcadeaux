import React, { useContext } from 'react';
import './header.styles.css'; // Importation du fichier CSS externe
// attention a rajouter ../../ pour que ça fonctionne

const Header = () => {


  return (
    <main className='main'>
      <div className="header">
        <h1 className="title">Cadeaux pour la famille et les ami(e)s</h1>
      </div>
    </main>
  );
};

export default Header;