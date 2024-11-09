// src/services/api.js
import axios from 'axios';

const BASE_URL = 'http://skp-vscose-app:5000';

export const fetchPatientDistribution = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/patient-distribution`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch patient distribution data');
    }
};
