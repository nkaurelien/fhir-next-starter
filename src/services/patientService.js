import fhirClient from '../lib/fhirClient';

// Create a new Patient
export const createPatient = async (patientData) => {
    try {
        const response = await fhirClient.create({
            resourceType: 'Patient',
            body: JSON.stringify(patientData), // Patient resource data
        });
        return response;
    } catch (error) {
        console.error('Error creating patient:', error);
        throw error;
    }
};

// Read a Patient by ID
export const readPatient = async (patientId) => {
    try {
        const response = await fhirClient.read({
            resourceType: 'Patient',
            id: patientId,
        });
        return response;
    } catch (error) {
        console.error('Error reading patient:', error);
        throw error;
    }
};

// Update a Patient by ID
export const updatePatient = async (patientId, patientData) => {
    try {
        const response = await fhirClient.update({
            resourceType: 'Patient',
            id: patientId,
            body: JSON.stringify(patientData), // Updated patient resource data
        });
        return response;
    } catch (error) {
        console.error('Error updating patient:', error);
        throw error;
    }
};

// Delete a Patient by ID
export const deletePatient = async (patientId) => {
    try {
        const response = await fhirClient.delete({
            resourceType: 'Patient',
            id: patientId,
        });
        return response;
    } catch (error) {
        console.error('Error deleting patient:', error);
        throw error;
    }
};

// Search for Patients
export const searchPatients = async (searchParams) => {
    try {
        const response = await fhirClient.search({
            resourceType: 'Patient',
            searchParams, // e.g., { name: 'John', birthdate: '1990-01-01' }
        });
        return response;
    } catch (error) {
        console.error('Error searching patients:', error);
        throw error;
    }
};