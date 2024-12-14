import Client from 'fhir-kit-client';

// Initialize the FHIR client with your FHIR server base URL
const fhirClient = new Client({
    baseUrl: process.env.NEXT_PUBLIC_FHIR_SERVER_URL || 'http://localhost:8080/fhir', // Replace with your FHIR server URL
});

export default fhirClient;