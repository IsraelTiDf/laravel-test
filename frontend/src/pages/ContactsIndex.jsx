import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { getContacts, deleteContact } from '../services/apiService';
import SnackbarAlert from '../components/SnackbarAlert';

const ContactsIndex = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Dialog states
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const response = await getContacts();
            setContacts(response.data.data);
        } catch (err) {
            setError('Failed to fetch contacts. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const openDialog = (contact) => {
        setSelectedContact(contact);
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setSelectedContact(null);
        setDialogOpen(false);
    };

    const confirmDelete = async () => {
        if (!selectedContact) return;
        try {
            await deleteContact(selectedContact.id);
            setContacts((prevContacts) =>
                prevContacts.filter((contact) => contact.id !== selectedContact.id)
            );
            setSuccess('Contact deleted successfully!');
        } catch (err) {
            setError('Failed to delete contact. Please try again.');
        } finally {
            closeDialog();
        }
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
            <Typography variant="h4" gutterBottom>
                Contacts List
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts.map((contact) => (
                            <TableRow key={contact.id}>
                                <TableCell>{contact.name}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.contact}</TableCell>
                                <TableCell>
                                    <Button
                                        component={Link}
                                        to={`/contacts/${contact.id}`}
                                        variant="outlined"
                                        color="primary"
                                    >
                                        View
                                    </Button>
                                    <Button
                                        onClick={() => openDialog(contact)}
                                        color="error"
                                        variant="contained"
                                        sx={{ ml: 1 }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button
                component={Link}
                to="/contacts/add"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
            >
                Add Contact
            </Button>

            <Dialog open={dialogOpen} onClose={closeDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete{' '}
                    <strong>{selectedContact?.name || 'this contact'}</strong>?
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <SnackbarAlert
                message={error}
                severity="error"
                open={!!error}
                onClose={() => setError(null)}
            />
            <SnackbarAlert
                message={success}
                severity="success"
                open={!!success}
                onClose={() => setSuccess(null)}
            />
        </Container>
    );
};

export default ContactsIndex;
