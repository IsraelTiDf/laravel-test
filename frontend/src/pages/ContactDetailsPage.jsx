import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, CircularProgress, Box } from '@mui/material';
import { getContact, updateContact } from '../services/apiService';
import ContactForm from '../components/ContactForm';
import SnackbarAlert from '../components/SnackbarAlert';

const ContactDetailsPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({ name: '', contact: '', email: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        setLoading(true);
        getContact(id)
            .then((response) => {
                setFormData(response.data.data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to fetch contact details.');
                setLoading(false);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateContact(id, formData)
            .then(() => {
                setSuccess('Contact updated successfully!');
                setTimeout(() => navigate('/'), 2000);
            })
            .catch((err) => {
                setError(err.response?.data?.error || 'An error occurred.');
            });
    };

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Edit Contact</Typography>
            <ContactForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                buttonLabel="Update"
            />
            <SnackbarAlert message={error} severity="error" open={!!error} onClose={() => setError(null)} />
            <SnackbarAlert message={success} severity="success" open={!!success} onClose={() => setSuccess(null)} />
        </Container>
    );
};

export default ContactDetailsPage;
