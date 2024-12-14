'use client'

import { useState, useEffect } from 'react';
import AppConfig from "@/config";

export default function PractitionerList({ refreshList, onManualRefresh }) {
  const [practitioners, setPractitioners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          const errorData = await response.json();
          setError(`Erreur lors de la récupération des praticiens: ${JSON.stringify(errorData)}`);
        }
      } catch (err) {
        setError(`Erreur de connexion: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    // Fetch practitioners immediately
    fetchPractitioners();

    // Set up auto-refresh every 10 seconds
    const intervalId = setInterval(fetchPractitioners, 10000); // 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);

  }, [refreshList]);

  return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mb-4">Liste des Praticiens</h2>
          <button
              onClick={onManualRefresh} // Call the manual refresh function
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
          >
            Actualiser
          </button>
        </div>
        {loading && <p className="text-gray-700">Chargement en cours...</p>}
        {error && (
            <div className="mt-4 p-4 text-red-700 bg-red-100 border border-red-400 rounded">
              <strong>{error}</strong>
            </div>
        )}
        {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse border border-gray-300">
                <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Prénom</th>
                  <th className="px-4 py-2">Nom</th>
                  <th className="px-4 py-2">Genre</th>
                  <th className="px-4 py-2">Adresse</th>
                  <th className="px-4 py-2">Téléphone</th>
                  <th className="px-4 py-2">Email</th>
                </tr>
                </thead>
                <tbody>
                {practitioners.map((practitioner) => (
                    <tr key={practitioner.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-2">{practitioner.id}</td>
                      <td className="px-4 py-2">{practitioner.name?.[0]?.given?.[0] || 'N/A'}</td>
                      <td className="px-4 py-2">{practitioner.name?.[0]?.family || 'N/A'}</td>
                      <td className="px-4 py-2">{practitioner.gender || 'N/A'}</td>
                      <td className="px-4 py-2">{practitioner.address?.[0]?.line?.[0] || 'N/A'}</td>
                      <td className="px-4 py-2">{practitioner.telecom?.find(t => t.system === 'phone')?.value || 'N/A'}</td>
                      <td className="px-4 py-2">{practitioner.telecom?.find(t => t.system === 'email')?.value || 'N/A'}</td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
        )}
      </div>
  );
}