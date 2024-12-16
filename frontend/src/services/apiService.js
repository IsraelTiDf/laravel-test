import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 10000,
});

export const getContacts = () => api.get('/api/contacts');
export const getContact = (id) => api.get(`/api/contacts/${id}`);
export const addContact = (data) => api.post('/api/contacts', data);
export const updateContact = (id, data) => api.put(`/api/contacts/${id}`, data);
export const deleteContact = (id) => api.delete(`/api/contacts/${id}`);

export default api;
