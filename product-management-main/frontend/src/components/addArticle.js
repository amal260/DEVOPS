import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newArticle, setNewArticle] = useState({});

  const handleChange = (e) => {
    setNewArticle({
      ...newArticle,
      [e.target.name]: e.target.value,
      fournisseur: id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3002/api/article', newArticle);
      navigate(`/admin/viewArticles/${id}`);
    } catch (error) {
      console.error('Erreur lors de la création de l\'article :', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Ajouter un Article</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Nom</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              type="text"
              name="nom"
              onChange={handleChange}
              required
              placeholder="Entrer le nom"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Prix Vente</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              type="number"
              name="prix_vente"
              onChange={handleChange}
              required
              placeholder="Entrer le prix de vente"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">TVA</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              type="number"
              name="tva"
              onChange={handleChange}
              required
              placeholder="Entrer la TVA"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Quantité</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              type="number"
              name="quantite"
              onChange={handleChange}
              required
              placeholder="Entrer la quantité"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Localisation</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              type="text"
              name="localisation"
              onChange={handleChange}
              required
              placeholder="Entrer la localisation"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Soumettre
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
