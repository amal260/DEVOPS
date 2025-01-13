import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ViewProduit = () => {
  const { id } = useParams('id');
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]);
  const divRef = useRef(null); // Utilisation correcte de useRef si nécessaire

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/article/fournisseur/${id}`);
        if (response) {
          const responseData = response.data;
          setProduits(responseData);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div ref={divRef}>
      <div className="">
        <div className=""></div>
        <h1 className="">Liste des produits</h1>
        <div className=""></div>
      </div>
      <div className="">
        {produits.map((produit) => (
          <div key={produit.id} className="">
            <div>
              <h3 className="">Nom : {produit.nom}</h3>
              <p className="">Prix de vente : {produit.prix_vente}</p>
              <p className="">TVA : {produit.tva}</p>
              <p className="">Quantité : {produit.quantite}</p>
              <p className="">Localisation : {produit.localisation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ViewProduit;
