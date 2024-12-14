import fhirClient from '../lib/fhirClient';

// Create a new Practitioner
export const createPractitioner = async (practitionerData) => {
    try {
        const response = await fhirClient.create({
            resourceType: 'Practitioner',
            body: JSON.stringify(practitionerData), // Practitioner resource data
        });
        return response;
    } catch (error) {
        console.error('Error creating practitioner:', error);
        throw error;
    }
};

// Read a Practitioner by ID
export const readPractitioner = async (practitionerId) => {
    try {
        const response = await fhirClient.read({
            resourceType: 'Practitioner',
            id: practitionerId,
        });
        return response;
    } catch (error) {
        console.error('Error reading practitioner:', error);
        throw error;
    }
};

// Update a Practitioner by ID
export const updatePractitioner = async (practitionerId, practitionerData) => {
    try {
        const response = await fhirClient.update({
            resourceType: 'Practitioner',
            id: practitionerId,
            body: JSON.stringify(practitionerData), // Updated practitioner resource data
        });
        return response;
    } catch (error) {
        console.error('Error updating practitioner:', error);
        throw error;
    }
};

// Delete a Practitioner by ID
export const deletePractitioner = async (practitionerId) => {
    try {
        const response = await fhirClient.delete({
            resourceType: 'Practitioner',
            id: practitionerId,
        });
        return response;
    } catch (error) {
        console.error('Error deleting practitioner:', error);
        throw error;
    }
};

// Search for Practitioners
export const searchPractitioners = async (searchParams) => {
    try {
        const response = await fhirClient.search({
            resourceType: 'Practitioner',
            searchParams, // e.g., { name: 'John', specialty: 'Cardiology' }
        });
        return response;
    } catch (error) {
        console.error('Error searching practitioners:', error);
        throw error;
    }
};