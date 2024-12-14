import fhirClient from '../lib/fhirClient';
import {
    createPatient,
    readPatient,
    updatePatient,
    deletePatient,
    searchPatients,
} from '../services/patientService';

// Mock the fhir-kit-client
jest.mock('../lib/fhirClient', () => ({
    create: jest.fn(),
    read: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    search: jest.fn(),
}));

describe('Patient Service Tests', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    // Test: Create Patient
    it('should create a patient', async () => {
        const patientData = {
            resourceType: 'Patient',
            name: [{ given: ['John'], family: 'Doe' }],
            gender: 'male',
            birthDate: '1990-01-01',
        };

        // Mock the response
        const mockResponse = { id: '123', ...patientData };
        fhirClient.create.mockResolvedValue(mockResponse);

        const response = await createPatient(patientData);

        expect(fhirClient.create).toHaveBeenCalledWith({
            resourceType: 'Patient',
            body: JSON.stringify(patientData),
        });
        expect(response).toEqual(mockResponse);
    });

    // Test: Read Patient
    it('should read a patient by ID', async () => {
        const patientId = '123';
        const mockResponse = {
            id: patientId,
            resourceType: 'Patient',
            name: [{ given: ['John'], family: 'Doe' }],
        };
        fhirClient.read.mockResolvedValue(mockResponse);

        const response = await readPatient(patientId);

        expect(fhirClient.read).toHaveBeenCalledWith({
            resourceType: 'Patient',
            id: patientId,
        });
        expect(response).toEqual(mockResponse);
    });

    // Test: Update Patient
    it('should update a patient by ID', async () => {
        const patientId = '123';
        const updatedPatientData = {
            name: [{ given: ['John'], family: 'Smith' }],
        };
        const mockResponse = { id: patientId, ...updatedPatientData };
        fhirClient.update.mockResolvedValue(mockResponse);

        const response = await updatePatient(patientId, updatedPatientData);

        expect(fhirClient.update).toHaveBeenCalledWith({
            resourceType: 'Patient',
            id: patientId,
            body: JSON.stringify(updatedPatientData),
        });
        expect(response).toEqual(mockResponse);
    });

    // Test: Delete Patient
    it('should delete a patient by ID', async () => {
        const patientId = '123';
        const mockResponse = { id: patientId, resourceType: 'Patient' };
        fhirClient.delete.mockResolvedValue(mockResponse);

        const response = await deletePatient(patientId);

        expect(fhirClient.delete).toHaveBeenCalledWith({
            resourceType: 'Patient',
            id: patientId,
        });
        expect(response).toEqual(mockResponse);
    });

    // Test: Search Patients
    it('should search for patients', async () => {
        const searchParams = { name: 'John' };
        const mockResponse = {
            entry: [
                {
                    resource: {
                        id: '123',
                        resourceType: 'Patient',
                        name: [{ given: ['John'], family: 'Doe' }],
                    },
                },
            ],
        };
        fhirClient.search.mockResolvedValue(mockResponse);

        const response = await searchPatients(searchParams);

        expect(fhirClient.search).toHaveBeenCalledWith({
            resourceType: 'Patient',
            searchParams,
        });
        expect(response).toEqual(mockResponse);
    });
});