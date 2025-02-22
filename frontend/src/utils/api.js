import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

// User Authentication
export const signup = async (email, password) => {
    const response = await api.post('/signup', { email, password });
    return response.data;
};

export const login = async (email, password) => {
    const response = await api.post('/login', { email, password });
    return response.data;
};

// Task Management
export const fetchTasks = async (token) => {
    const response = await api.get('/tasks', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const createTask = async (taskData, token) => {
    const response = await api.post('/tasks', taskData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const updateTask = async (taskId, taskData, token) => {
    const response = await api.put(`/tasks/${taskId}`, taskData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deleteTask = async (taskId, token) => {
    await api.delete(`/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};


export default api;