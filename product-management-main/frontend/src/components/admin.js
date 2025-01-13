import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const navigate = useNavigate();
  const [fournisseurs, setFournisseurs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/fournisseur/`);
        if (response && response.data) {
          setFournisseurs(response.data);
        } else {
          setError('Aucun fournisseur trouvé.');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des fournisseurs :', error);
        setError('Une erreur est survenue. Veuillez réessayer plus tard.');
      }
    };

    fetchData();
  }, []);

  const logout = () => {
    navigate('/');
  };

  const viewUsers = () => {
    navigate('/admin/users');
  };

  const delFournisseur = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/fournisseur/${id}`);
      setFournisseurs((prev) => prev.filter((f) => f.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du fournisseur :", error);
      alert("Impossible de supprimer le fournisseur. Veuillez réessayer.");
    }
  };

  const addFournisseur = () => {
    navigate('/admin/addFournisseur');
  };

  const updateFournisseur = (id) => {
    navigate(`/admin/updateFournisseur/${id}`);
  };

  const viewArticles = (id) => {
    navigate(`/admin/viewArticles/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Tableau de bord Admin</h1>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={logout}
          >
            Se déconnecter
          </button>
        </div>

        <div className="mb-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={viewUsers}
          >
            Voir les utilisateurs
          </button>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Liste des fournisseurs</h2>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={addFournisseur}
            >
              Ajouter un fournisseur
            </button>
          </div>
        </div>

        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {fournisseurs.map((fournisseur) => (
              <div
                key={fournisseur.id}
                className="bg-gray-50 p-4 rounded shadow-md border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {fournisseur.nom}
                </h3>
                <p className="text-gray-600">Localisation : {fournisseur.localisation}</p>
                <div className="flex gap-2 mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => viewArticles(fournisseur.id)}
                  >
                    Voir les articles
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    onClick={() => updateFournisseur(fournisseur.id)}
                  >
                    Modifier
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => delFournisseur(fournisseur.id)}
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

export default Admin;
