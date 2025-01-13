import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const ViewArticles = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]);

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

  const delArticle = async (articleId) => {
    try {
      await axios.delete(`http://localhost:3002/api/article/${articleId}`);
      setProduits((prev) => prev.filter((produit) => produit.id !== articleId));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article :', error);
    }
  };

  const addArticle = () => {
    navigate(`/admin/addArticle/${id}`);
  };

  const updateArticle = (articleId) => {
    navigate(`/admin/updateArticle/${id}/${articleId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Liste des produits</h1>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={addArticle}
          >
            Ajouter un article
          </button>
        </div>

        {produits.length === 0 ? (
          <p className="text-gray-600">Aucun produit disponible.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {produits.map((produit) => (
              <div
                key={produit.id}
                className="bg-gray-50 p-4 rounded shadow-md border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-800">Nom : {produit.nom}</h3>
                <p className="text-gray-600">Prix de vente : {produit.prix_vente}</p>
                <p className="text-gray-600">TVA : {produit.tva}</p>
                <p className="text-gray-600">Quantité : {produit.quantite}</p>
                <p className="text-gray-600">Localisation : {produit.localisation}</p>
                <div className="flex gap-2 mt-4">
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    onClick={() => updateArticle(produit.id)}
                  >
                    Modifier
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => delArticle(produit.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewArticles;
