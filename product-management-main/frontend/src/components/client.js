import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Client = () => {
  const { id } = useParams('id');
  const navigate = useNavigate();
  const [fournisseurs, setFournisseurs] = useState([]);
  const divRef = useRef(null); // Utilisation correcte de useRef

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/fournisseur');
        if (response) {
          const responseData = response.data;
          setFournisseurs(responseData);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des fournisseurs :', error);
      }
    };
    fetchData();
  }, []);

  const viewArticles = (id) => {
    console.log(id);
    navigate(`/viewProduit/${id}`);
  };

  const updateAccount = (id) => {
    navigate(`/updateAccountGeneral/${id}`);
  };

  const logout = () => {
    navigate('/');
  };

  return (
    <div ref={divRef}>
      <div className="">
        <div className="">
          <button className="" onClick={() => updateAccount(id)}>
            Mettre à jour le compte
          </button>
        </div>
        <h1 className="">Liste des fournisseurs</h1>
        <div className="">
          <button className="" onClick={() => logout()}>
            Déconnexion
          </button>
        </div>
      </div>
      <div className="">
        {fournisseurs.map((fournisseur) => (
          <div key={fournisseur.id} className="element">
            <div>
              <h3 className="">Nom : {fournisseur.nom}</h3>
              <p className="">Localisation : {fournisseur.localisation}</p>
              <button
                onClick={() => viewArticles(fournisseur.id)}
                className=""
              >
                Voir les articles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Client;
