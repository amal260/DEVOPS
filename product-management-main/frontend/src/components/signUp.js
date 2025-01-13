import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({});

  const handleChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
      ROLE: "Client",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(newUser);
      await axios.post('http://localhost:3002/api/users', newUser);
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la création du compte :', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Créer un Compte</h1>
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
            <label className="block text-gray-700 font-medium">Prénom</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              type="text"
              name="prenom"
              onChange={handleChange}
              required
              placeholder="Entrer le prénom"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              type="email"
              name="email"
              onChange={handleChange}
              required
              placeholder="Entrer l'email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Mot de passe</label>
            <input
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
              type="password"
              name="password"
              onChange={handleChange}
              required
              placeholder="Entrer le mot de passe"
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

export default SignUp;
