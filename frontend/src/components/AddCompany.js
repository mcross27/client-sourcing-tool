import React, { useContext, useState } from 'react';
import { CompanyContext } from '../contexts/CompanyContext';

const AddCompany = () => {
    const { addCompany } = useContext(CompanyContext);
    const [name, setName] = useState('');
    const [website, setWebsite] = useState('');
    const [industry, setIndustry] = useState('');
    const [companyLinkedin, setCompanyLinkedin] = useState('');
    const [message, setMessage] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newCompany = { name, website, industry, companyLinkedin };
        try{
            await addCompany(newCompany);
            setMessage('Company added');
            setName('');
            setWebsite('');
            setIndustry('');
            setCompanyLinkedin('');
        } catch(error) {
            console.error('Error adding company: ', error);
            setMessage('Failed to add company');
        }
    };
    
    return (
        <div>
            <h1>Add Company</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder='Name'
                value={name}
                onChange={(event) => setName(event.target.value)}
                required />

                <input
                type="text"
                placeholder='Website'
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                />

                <input
                type="text"
                placeholder='Industry'
                value={industry}
                onChange={(event) => setIndustry(event.target.value)}
                />

                <input
                type="text"
                placeholder='Company LinkedIn'
                value={companyLinkedin}
                onChange={(event) => setCompanyLinkedin(event.target.value)}
                />

                <button type="submit">Add Company</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
 };

 export default AddCompany;