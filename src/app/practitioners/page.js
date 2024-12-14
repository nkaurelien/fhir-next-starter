'use client'

import {useState} from "react";
import PractitionerForm from "./form";
import PractitionerList from "./list";

export default function PractitionerPage() {
  const [refreshList, setRefreshList] = useState(0); // State to trigger list refresh

  // Function to refresh the patient list
  const handleRefreshList = () => {
    setRefreshList((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Gestion des Praticiens</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <PractitionerList  refreshList={refreshList} onManualRefresh={handleRefreshList}  />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <PractitionerForm onPractitionerCreated={handleRefreshList}  />
          </div>
        </div>
      </div>
    </div>
  );
}