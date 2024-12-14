'use client'

import { useState } from 'react';
import AppConfig from "@/config";

export default function PractitionerForm({ onPractitionerCreated }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    phone: '',
    email: ''
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

    const practitionerResource = {
      resourceType: 'Practitioner',
      name: [
        {
          family: formData.lastName,
          given: [formData.firstName],
        },
      ],
      gender: formData.gender,
      address: [
        {
          line: [formData.address],
        },
      ],
      telecom: [
        {
          system: 'phone',
          value: formData.phone,
        },
        {
          system: 'email',
          value: formData.email,
        },
      ],
    };

    try {
      const response = await fetch(`${AppConfig.API_BASE_URL}/Practitioner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(practitionerResource),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(`Praticien créé avec succès. ID: ${data.id}`);
        setFormData({
          firstName: '',
          lastName: '',
          gender: '',
          address: '',
          phone: '',
          email: ''
        }); // Reset form


        // Trigger list refresh
        onPractitionerCreated();

      } else {
        const errorData = await response.json();
        setResponseMessage(`Erreur: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      setResponseMessage(`Erreur de connexion: ${error.message}`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Créer un Praticien</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
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
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
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
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
            Genre :
          </label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">--Choisir--</option>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
            <option value="other">Autre</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Adresse :
          </label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Téléphone :
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email :
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
        >
          Soumettre
        </button>
      </form>

      {responseMessage && (
        <div className="mt-4 p-4 text-green-700 bg-green-100 border border-green-400 rounded">
          <strong>{responseMessage}</strong>
        </div>
      )}
    </div>
  );
}