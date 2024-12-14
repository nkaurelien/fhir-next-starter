import fhirClient from '../lib/fhirClient';
import {
    createPractitioner,
    readPractitioner,
    updatePractitioner,
    deletePractitioner,
    searchPractitioners,
} from '../services/practitionerService';

// Mock the fhir-kit-client
jest.mock('../lib/fhirClient', () => ({
    create: jest.fn(),
    read: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    search: jest.fn(),
}));

describe('Practitioner Service Tests', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    // Test: Create Practitioner
    it('should create a practitioner', async () => {
        const practitionerData = {
            resourceType: 'Practitioner',
            name: [{ given: ['Jane'], family: 'Smith' }],
            gender: 'female',
        };

        // Mock the response
        const mockResponse = { id: '456', ...practitionerData };
        fhirClient.create.mockResolvedValue(mockResponse);

        const response = await createPractitioner(practitionerData);

        expect(fhirClient.create).toHaveBeenCalledWith({
            resourceType: 'Practitioner',
            body: JSON.stringify(practitionerData),
        });
        expect(response).toEqual(mockResponse);
    });

    // Test: Read Practitioner
    it('should read a practitioner by ID', async () => {
        const practitionerId = '456';
        const mockResponse = {
            id: practitionerId,
            resourceType: 'Practitioner',
            name: [{ given: ['Jane'], family: 'Smith' }],
        };
        fhirClient.read.mockResolvedValue(mockResponse);

        const response = await readPractitioner(practitionerId);

        expect(fhirClient.read).toHaveBeenCalledWith({
            resourceType: 'Practitioner',
            id: practitionerId,
        });
        expect(response).toEqual(mockResponse);
    });

    // Test: Update Practitioner
    it('should update a practitioner by ID', async () => {
        const practitionerId = '456';
        const updatedPractitionerData = {
            name: [{ given: ['Jane'], family: 'Doe' }],
        };
        const mockResponse = { id: practitionerId, ...updatedPractitionerData };
        fhirClient.update.mockResolvedValue(mockResponse);

        const response = await updatePractitioner(practitionerId, updatedPractitionerData);

        expect(fhirClient.update).toHaveBeenCalledWith({
            resourceType: 'Practitioner',
            id: practitionerId,
            body: JSON.stringify(updatedPractitionerData),
        });
        expect(response).toEqual(mockResponse);
    });

    // Test: Delete Practitioner
    it('should delete a practitioner by ID', async () => {
        const practitionerId = '456';
        const mockResponse = { id: practitionerId, resourceType: 'Practitioner' };
        fhirClient.delete.mockResolvedValue(mockResponse);

        const response = await deletePractitioner(practitionerId);

        expect(fhirClient.delete).toHaveBeenCalledWith({
            resourceType: 'Practitioner',
            id: practitionerId,
        });
        expect(response).toEqual(mockResponse);
    });

    // Test: Search Practitioners
    it('should search for practitioners', async () => {
        const searchParams = { name: 'Jane' };
        const mockResponse = {
            entry: [
                {
                    resource: {
                        id: '456',
                        resourceType: 'Practitioner',
                        name: [{ given: ['Jane'], family: 'Smith' }],
                    },
                },
            ],
        };
        fhirClient.search.mockResolvedValue(mockResponse);

        const response = await searchPractitioners(searchParams);

        expect(fhirClient.search).toHaveBeenCalledWith({
            resourceType: 'Practitioner',
            searchParams,
        });
        expect(response).toEqual(mockResponse);
    });
});