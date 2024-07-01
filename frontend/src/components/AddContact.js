// import React, { useContext, useState } from 'react';
// import { ContactContext } from '../contexts/ContactContext';
// import { CompanyContext } from '../contexts/CompanyContext';

// const AddContact = () => {
//     const { addContact } = useContext(ContactContext);
//     const { companies } = useContext(CompanyContext);
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [linkedIn, setLinkedIn] = useState('');
//     const [position, setPosition] = useState('');
//     const [company, setCompany] = useState('');
//     const [message, setMessage] = useState('');
    
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const newContact = { name, email, linkedIn, position, company };
//         try{
//             await addContact(newContact);
//             setMessage('Contact added successfully');
//             setName('');
//             setEmail('');
//             setLinkedIn('');
//             setPosition('');
//             setCompany('');
//         }
//         catch(error) {
//             console.error('Error adding contact: ', error);
//             setMessage('Failed to add contact');
//         }
//     };
    
//     return (
//         <div>
//         <h1>Add Contact</h1>
//         <form onSubmit={handleSubmit}>
//             <input
//             type="text"
//             placeholder='Name'
//             value={name}
//             onChange={(event) => setName(event.target.value)}
//             required />

//             <input
//             type="email"
//             placeholder='Email'
//             value={email}
//             onChange={(event) => setEmail(event.target.value)}
//             required />

//             <input
//             type="text"
//             placeholder='LinkedIn'
//             value={linkedIn}
//             onChange={(event) => setLinkedIn(event.target.value)}
//             />

//             <input
//             type="text"
//             placeholder='Position'
//             value={position}
//             onChange={(event) => setPosition(event.target.value)}
//             />

//             <select value={company} onChange={(event) => setCompany(event.target.value)} required>
//                 <option value="">Select a company</option>
//                 {companies.map(company => <option key={company._id} value={company._id}>{company.name}</option>)}
//             </select>

//             <button type="submit">Add Contact</button>
//         </form>
//         {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default AddContact;

import React, { useContext, useState } from 'react';
import { ContactContext } from '../contexts/ContactContext';
import { CompanyContext } from '../contexts/CompanyContext';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography, Box } from '@mui/material';

const AddContact = () => {
    const { addContact } = useContext(ContactContext);
    const { companies } = useContext(CompanyContext);
    const [contact, setContact] = useState({
        name: '',
        email: '',
        linkedIn: '',
        position: '',
        company: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setContact({ ...contact, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addContact(contact);
            setMessage('Contact added successfully');
            setContact({ name: '', email: '', linkedIn: '', position: '', company: '' });
        } catch (error) {
            console.error('Error adding contact: ', error);
            setMessage('Failed to add contact');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>Add Contact</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="name"
                    label="Name"
                    value={contact.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    name="email"
                    label="Email"
                    type="email"
                    value={contact.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    name="linkedIn"
                    label="LinkedIn"
                    value={contact.linkedIn}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="position"
                    label="Position"
                    value={contact.position}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Company</InputLabel>
                    <Select
                        name="company"
                        value={contact.company}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {companies.map(company => (
                            <MenuItem key={company._id} value={company._id}>{company.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Add Contact
                </Button>
            </form>
            {message && <Typography color={message.includes('successfully') ? 'success' : 'error'} sx={{ mt: 2 }}>{message}</Typography>}
        </Box>
    );
};

export default AddContact;