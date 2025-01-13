import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/api/users/`);
        if (response) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
      }
    };
    fetchData();
  }, []);

  const delUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    }
  };

  const updateUser = (id) => {
    navigate(`/updateAccountGeneralAdmin/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Liste des utilisateurs</h1>
        {users.length === 0 ? (
          <p className="text-gray-600">Aucun utilisateur trouvé.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-gray-50 p-4 rounded shadow-md border border-gray-200"
              >
                <p className="text-gray-800 font-medium">Nom : {user.nom}</p>
                <p className="text-gray-600">Prénom : {user.prenom}</p>
                <p className="text-gray-600">Email : {user.email}</p>
                <p className="text-gray-600">Rôle : {user.ROLE}</p>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => updateUser(user.id)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => delUser(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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

export default AdminUsers;
