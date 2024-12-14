// pages/patient.js
import { useState } from 'react';

export default function PatientForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: ''
  });

  const [responseMessage, setResponseMessage] = useState(null);

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Soumettre les données à l'API HAPI FHIR
  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientResource = {
      resourceType: 'Patient',
      name: [
        {
          family: formData.lastName,
          given: [formData.firstName],
        },
      ],
      gender: formData.gender,
      birthDate: formData.birthDate,
    };

    try {
      const response = await fetch('http://localhost:8080/fhir/Patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientResource),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(`Patient créé avec succès. ID: ${data.id}`);
      } else {
        const errorData = await response.json();
        setResponseMessage(`Erreur: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      setResponseMessage(`Erreur de connexion: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-2xl font-bold mb-6">Créer un Patient</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded px-8 py-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            Prénom :
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Nom :
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
            Genre :
          </label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">--Choisir--</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
            <option value="other">Autre</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthDate">
            Date de naissance :
          </label>
          <input
            type="date"
            name="birthDate"
            id="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
        >
          Soumettre
        </button>
      </form>

      {responseMessage && (
        <div className="mt-6 p-4 text-green-700 bg-green-100 border border-green-400 rounded">
          <strong>{responseMessage}</strong>
        </div>
      )}
    </div>
  );
}
