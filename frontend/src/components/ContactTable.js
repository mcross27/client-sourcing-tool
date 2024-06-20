import React, { useState, useContext, useEffect } from 'react';
import {
    Table, TableBody,TableCell, TableContainer,TableHead,TableRow,Paper,TextField, Button
    } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { ContactContext } from '../contexts/ContactContext';

const ContactTable = () => {
    const { companyId } = useParams();
    const { contacts, fetchContactsByCompany, editContact, deleteContact } = useContext(ContactContext);
    const [editIdx, setEditIdx] = useState(-1);
    const [currentContact, setCurrentContact] = useState({});

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

    return (
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
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ContactTable;