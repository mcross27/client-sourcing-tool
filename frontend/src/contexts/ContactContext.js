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

    // Use the useEffect hook to fetch contacts when the component mounts
    useEffect(() => {
        fetchContacts();
    }, []);

    // Return the ContactProvider with the context value
    return (
        <ContactContext.Provider value={{ contacts, addContact }}>
            {children}
        </ContactContext.Provider>
    );
};