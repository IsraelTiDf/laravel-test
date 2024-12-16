import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { addContact } from '../services/apiService';
import ContactForm from '../components/ContactForm';
import SnackbarAlert from '../components/SnackbarAlert';

const AddContactPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', contact: '', email: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addContact(formData)
            .then(() => {
                setSuccess('Contact added successfully!');
                setTimeout(() => navigate('/contacts'), 2000);
            })
            .catch((err) => {
                if (err.response?.data?.error) {
                    setError(err.response.data.error);
                } else {
                    setError('An error occurred.');
                }
            });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Add Contact</Typography>
            <ContactForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                buttonLabel="Add"
            />
            <SnackbarAlert message={error} severity="error" open={!!error} onClose={() => setError(null)} />
            <SnackbarAlert message={success} severity="success" open={!!success} onClose={() => setSuccess(null)} />
        </Container>
    );
};

export default AddContactPage;
