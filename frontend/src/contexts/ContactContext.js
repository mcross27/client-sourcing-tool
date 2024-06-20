import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the ContactContext
export const ContactContext = createContext();

// Create the ContactProvider component
export const ContactProvider = ({ children }) => {
    // Define the state for contacts
    const [contacts, setContacts] = useState([]);

    // Add any other functions or state variables related to contacts here
    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/contacts');
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts', error);
        }
    };

    const addContact = async (newContact) => {
        try {
            const response = await axios.post('http://localhost:3000/api/contacts', newContact);
            setContacts([...contacts, response.data]);
        } catch (error) {
            console.error('Error adding contact', error);
        }
    };

    const fetchContactsByCompany = async (companyId) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/contacts/company/${companyId}`);
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts', error);
        }
    };

    const editContact = async (id, updatedContact) => {
        try {
            const response = await axios.patch(`http://localhost:3000/api/contacts/${id}`, updatedContact);
            setContacts(contacts.map(contact => (contact._id === id) ? response.data : contact));
        } catch (error) {
            console.error('Error updating contact', error);
        }
    };

    const deleteContact = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/contacts/${id}`);
            setContacts(contacts.filter(contact => contact._id !== id));
        } catch (error) {
            console.error('Error deleting contact', error);
        }
    };

    // Use the useEffect hook to fetch contacts when the component mounts
    useEffect(() => {
        fetchContacts();
    }, []);

    // Return the ContactProvider with the context value
    return (
        <ContactContext.Provider value={{ contacts, fetchContactsByCompany, addContact, editContact, deleteContact }}>
            {children}
        </ContactContext.Provider>
    );
};