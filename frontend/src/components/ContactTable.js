import React, { useState, useContext, useEffect } from 'react';
import {
    Table, TableBody,TableCell, TableContainer,TableHead,TableRow,Paper,TextField, Button
    } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Delete as DeleteIcon, ArrowBack as ArrowBackIcon, Add as AddIcon } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { ContactContext } from '../contexts/ContactContext';

const ContactTable = () => {
    const { companyId } = useParams();
    const { contacts, fetchContactsByCompany, addContact, editContact, deleteContact } = useContext(ContactContext);
    const [editIdx, setEditIdx] = useState(-1);
    const [currentContact, setCurrentContact] = useState({});
    const [newContact, setNewContact] = useState({
        name: '',
        email: '',
        linkedIn: '',
        position: '',
        company: companyId
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchContactsByCompany(companyId);
    }, [companyId, fetchContactsByCompany]);

    const handleEdit = async (index, contact) => {
        setEditIdx(index);
        setCurrentContact(contact);
    };

    const handleSave = async (id) => {
        await editContact(id, currentContact);
        setEditIdx(-1);
    };

    const handleChange = (event) => {
        setCurrentContact({ ...currentContact, [event.target.name]: event.target.value });
    };

    const handleBackClick = () => {
        navigate('/');
    };

    const handleAdd = async () => {
        await addContact(newContact);
        setNewContact({
            name: '',
            email: '',
            linkedIn: '',
            position: ''
        });
    };

    const handleNewChange = (event) => {
        setNewContact({ ...newContact, [event.target.name]: event.target.value });
    };

    return (
        <div style={{padding: 'auto', margin: 'auto'}}>
            <h1>Contacts</h1>
            <Button onClick={handleBackClick} startIcon={<ArrowBackIcon />} variant="text" color="primary" style={{display: 'flex', justifyContent: 'flex-start', marginBottom: '16px'}}>Companies</Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>LinkedIn</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts.map((contact, index) => (
                            <TableRow key={contact._id}>
                                <TableCell>
                                    {editIdx === index ? (
                                        <TextField
                                            name="name"
                                            value={currentContact.name}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        contact.name
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIdx === index ? (
                                        <input
                                            name="email"
                                            value={currentContact.email}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        contact.email
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIdx === index ? (
                                        <input
                                            name="linkedIn"
                                            value={currentContact.linkedIn}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        contact.linkedIn
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIdx === index ? (
                                        <input
                                            name="position"
                                            value={currentContact.position}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        contact.position
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIdx === index ? (
                                        <SaveIcon onClick={() => handleSave(contact._id)}><SaveIcon /></SaveIcon>
                                    ) : (
                                        <EditIcon onClick={() => handleEdit(index, contact)}><EditIcon /></EditIcon>
                                    )}
                                    <DeleteIcon onClick={() => deleteContact(contact._id)}><DeleteIcon /></DeleteIcon>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell>
                                <TextField
                                    name="name"
                                    value={newContact.name}
                                    onChange={handleNewChange}
                                    placeholder='Name'
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="email"
                                    value={newContact.email}
                                    onChange={handleNewChange}
                                    placeholder='Email'
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="linkedIn"
                                    value={newContact.linkedIn}
                                    onChange={handleNewChange}
                                    placeholder='LinkedIn'
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="position"
                                    value={newContact.position}
                                    onChange={handleNewChange}
                                    placeholder='Position'
                                />
                            </TableCell>
                            <TableCell>
                                <AddIcon onClick={handleAdd}><AddIcon /></AddIcon>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ContactTable;