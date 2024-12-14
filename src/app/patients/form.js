'use client'

import { useState, useEffect } from 'react';
import AppConfig from "@/config";

export default function PatientForm({ onPatientCreated }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    birthDate: '',
    address: '',
    phone: '',
    email: '',
    practitioner: null, // Selected practitioner ID
  });

  const [practitioners, setPractitioners] = useState([]); // List of practitioners
  const [responseMessage, setResponseMessage] = useState(null);

  // Fetch practitioners from the HAPI FHIR API
  useEffect(() => {
    const fetchPractitioners = async () => {
      try {
        const response = await fetch(`${AppConfig.API_BASE_URL}/Practitioner`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Extract practitioner data from the response
          const practitionerList = data.entry || [];
          setPractitioners(practitionerList.map(entry => entry.resource));
        } else {
          console.error('Failed to fetch practitioners');
        }
      } catch (err) {
        console.error('Error fetching practitioners:', err);
      }
    };

    fetchPractitioners();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle practitioner selection
  const handlePractitionerChange = (e) => {
    const selectedPractitionerId = e.target.value || null;
    setFormData((prevData) => ({
      ...prevData,
      practitioner: selectedPractitionerId,
    }));
  };

  // Submit the form data to the FHIR API
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
      generalPractitioner: formData.practitioner
        ? [
            {
              reference: `Practitioner/${formData.practitioner}`,
            },
          ]
        : [],
    };

    try {
      const response = await fetch(`${AppConfig.API_BASE_URL}/Patient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientResource),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(`Patient créé avec succès. ID: ${data.id}`);
        setFormData({
          firstName: '',
          lastName: '',
          gender: '',
          birthDate: '',
          address: '',
          phone: '',
          email: '',
          practitioner: null,
        }); // Reset form

        // Trigger list refresh
        onPatientCreated();
        
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
      <h2 className="text-2xl font-bold mb-4">Créer un Patient</h2>
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
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
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
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="practitioner">
            Praticien :
          </label>
          <select
            name="practitioner"
            id="practitioner"
            value={formData.practitioner || ''}
            onChange={handlePractitionerChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">-- Aucun praticien --</option>
            {practitioners.map((practitioner) => (
              <option key={practitioner.id} value={practitioner.id}>
                {practitioner.name?.[0]?.given?.[0]} {practitioner.name?.[0]?.family}
              </option>
            ))}
          </select>
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