// api/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://restcountries.com/v3.1/',
});

const getPaises = async () => {
    try {
        const response = await apiClient.get('all');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export { getPaises };