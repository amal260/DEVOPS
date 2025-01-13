import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [info, setInfo] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(info);

    try {
      const response = await axios.post('http://localhost:3002/api/users/login', info);

      if (response && response.data) {
        if (response.data.ROLE === "Admin") {
          navigate(`/admin/${response.data.id}`);
        } else if (response.data.ROLE === "Client") {
          navigate(`/client/${response.data.id}`);
        } else {
          setErrors({ server: "Rôle utilisateur non reconnu." });
        }
      } else {
        setErrors({ server: "Mauvaise requête. Vérifiez vos informations." });
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrors({ server: error.response.data.message });
      } else {
        setErrors({ server: "Une erreur est survenue, veuillez réessayer." });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Se connecter</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Soumettre
          </button>
        </form>
        {errors.server && <p className="text-red-500 mt-4">{errors.server}</p>}
        <div className="mt-4 text-center">
          <Link
            to="/SignUp"
            className="text-indigo-600 hover:text-indigo-500 font-semibold"
          >
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
