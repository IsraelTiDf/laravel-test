import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const ContactForm = ({ formData, onChange, onSubmit, buttonLabel }) => (
    <Box component="form" onSubmit={onSubmit}>
        <TextField
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={onChange}
            margin="normal"
        />
        <TextField
            label="Contact"
            name="contact"
            fullWidth
            value={formData.contact}
            onChange={onChange}
            margin="normal"
        />
        <TextField
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={onChange}
            margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            {buttonLabel}
        </Button>
    </Box>
);

export default ContactForm;
