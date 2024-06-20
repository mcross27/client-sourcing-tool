import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
    const [companies, setCompanies] = useState([]);

    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/companies');
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies', error);
      }
    };
    const addCompany = async (newCompany) => {
        try {
            const response = await axios.post('http://localhost:3000/api/companies', newCompany);
            setCompanies([...companies, response.data]);
        } catch (error) {
            console.error('Error adding company', error);
        }
    };

    const editCompany = async (id, updatedCompany) => {
        try {
            const response = await axios.patch(`http://localhost:3000/api/companies/${id}`, updatedCompany);
            setCompanies(companies.map(company => (company._id == id) ? response.data : company));
        } catch (error) {
            console.error('Error updating company', error);
        }
    };

    const deleteCompany = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/companies/${id}`);
            setCompanies(companies.filter(company => company._id !== id));
        } catch (error) {
            console.error('Error deleting company', error);
        }
    };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <CompanyContext.Provider value={{ companies, addCompany, editCompany, deleteCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

