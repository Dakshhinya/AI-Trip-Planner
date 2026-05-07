import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const saveTrip = async (tripData) => {
    try {
        const response = await api.post('/trips/save-trip', tripData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getTripById = async (id) => {
    try {
        const response = await api.get(`/trips/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUserTrips = async (email) => {
    try {
        const response = await api.get(`/trips/user-trips/${email}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default api;
