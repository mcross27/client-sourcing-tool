// import React, { useContext, useState } from 'react';
// import { CompanyContext } from '../contexts/CompanyContext';

// const AddCompany = () => {
//     const { addCompany } = useContext(CompanyContext);
//     const [name, setName] = useState('');
//     const [website, setWebsite] = useState('');
//     const [industry, setIndustry] = useState('');
//     const [companyLinkedin, setCompanyLinkedin] = useState('');
//     const [message, setMessage] = useState('');
    
//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const newCompany = { name, website, industry, companyLinkedin };
//         try{
//             await addCompany(newCompany);
//             setMessage('Company added');
//             setName('');
//             setWebsite('');
//             setIndustry('');
//             setCompanyLinkedin('');
//         } catch(error) {
//             console.error('Error adding company: ', error);
//             setMessage('Failed to add company');
//         }
//     };
    
//     return (
//         <div>
//             <h1>Add Company</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                 type="text"
//                 placeholder='Name'
//                 value={name}
//                 onChange={(event) => setName(event.target.value)}
//                 required />

//                 <input
//                 type="text"
//                 placeholder='Website'
//                 value={website}
//                 onChange={(event) => setWebsite(event.target.value)}
//                 />

//                 <input
//                 type="text"
//                 placeholder='Industry'
//                 value={industry}
//                 onChange={(event) => setIndustry(event.target.value)}
//                 />

//                 <input
//                 type="text"
//                 placeholder='Company LinkedIn'
//                 value={companyLinkedin}
//                 onChange={(event) => setCompanyLinkedin(event.target.value)}
//                 />

//                 <button type="submit">Add Company</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
//  };

//  export default AddCompany;

import React, { useContext, useState } from 'react';
import { CompanyContext } from '../contexts/CompanyContext';
import { TextField, Button, Typography, Box } from '@mui/material';

const AddCompany = () => {
    const { addCompany } = useContext(CompanyContext);
    const [company, setCompany] = useState({
        name: '',
        website: '',
        industry: '',
        companyLinkedin: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setCompany({ ...company, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addCompany(company);
            setMessage('Company added successfully');
            setCompany({ name: '', website: '', industry: '', companyLinkedin: '' });
        } catch (error) {
            console.error('Error adding company: ', error);
            setMessage('Failed to add company');
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>Add Company</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="name"
                    label="Company Name"
                    value={company.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    name="website"
                    label="Website"
                    value={company.website}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="industry"
                    label="Industry"
                    value={company.industry}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    name="companyLinkedin"
                    label="Company LinkedIn"
                    value={company.companyLinkedin}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                    Add Company
                </Button>
            </form>
            {message && <Typography color={message.includes('successfully') ? 'success' : 'error'} sx={{ mt: 2 }}>{message}</Typography>}
        </Box>
    );
};

export default AddCompany;