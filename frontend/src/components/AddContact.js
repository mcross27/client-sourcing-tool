import React, { useContext, useState } from 'react';
import { ContactContext } from '../contexts/ContactContext';
import { CompanyContext } from '../contexts/CompanyContext';

const AddContact = () => {
    const { addContact } = useContext(ContactContext);
    const { companies } = useContext(CompanyContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [linkedIn, setLinkedIn] = useState('');
    const [position, setPosition] = useState('');
    const [company, setCompany] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newContact = { name, email, linkedIn, position, company };
        try{
            await addContact(newContact);
            setMessage('Contact added successfully');
            setName('');
            setEmail('');
            setLinkedIn('');
            setPosition('');
            setCompany('');
        }
        catch(error) {
            console.error('Error adding contact: ', error);
            setMessage('Failed to add contact');
        }
    };
    
    return (
        <div>
        <h1>Add Contact</h1>
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder='Name'
            value={name}
            onChange={(event) => setName(event.target.value)}
            required />

            <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required />

            <input
            type="text"
            placeholder='LinkedIn'
            value={linkedIn}
            onChange={(event) => setLinkedIn(event.target.value)}
            />

            <input
            type="text"
            placeholder='Position'
            value={position}
            onChange={(event) => setPosition(event.target.value)}
            />

            <select value={company} onChange={(event) => setCompany(event.target.value)} required>
                <option value="">Select a company</option>
                {companies.map(company => <option key={company._id} value={company._id}>{company.name}</option>)}
            </select>

            <button type="submit">Add Contact</button>
        </form>
        {message && <p>{message}</p>}
        </div>
    );
};

export default AddContact;