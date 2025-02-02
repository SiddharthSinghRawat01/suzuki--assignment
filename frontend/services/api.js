import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/users";

// Fetch all users
export const fetchUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Fetch a single user by ID
export const fetchUserById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

// Create a new user
export const createUser = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error.response?.data || error.message);
        throw error;
    }
};
// Update a user
export const updateUser = async (id, userData) => {
    const response = await axios.put(`${API_URL}/${id}`, userData);
    return response.data;
};

// Delete a user
export const deleteUser = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
