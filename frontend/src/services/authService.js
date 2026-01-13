import axios from 'axios';

const API_URL =  import.meta.env.VITE_BACKEND_API_URL + '/api/users';

export const register = async(userData) =>{
    try {
        const  response = await axios.post(`${API_URL}/register`, userData);
    } catch (error) {
        console.error('Registration failed:', error.response.data);
        throw error.response.data;
        
    }
}


export const login = async(userData) =>{
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        return response.data;

    } catch (error) {
        console.error('Login failed:', error.response.data);
        throw error.response.data;
    }}
    