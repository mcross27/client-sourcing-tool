import React, { useContext } from 'react';
import { ContactContext } from '../contexts/ContactContext';

const ContactList = () => {
    const { contacts } = useContext(ContactContext);

    return (
        <div>
            <h1>Contacts</h1>
            <ul>
                {contacts.map(contact => <li key={contact._id}>{contact.name} ({contact.email})</li>)}
            </ul>
        </div>
    );
};

export default ContactList;