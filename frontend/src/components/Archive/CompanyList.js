import React, { useContext, useState } from 'react';
import { CompanyContext } from '../../contexts/CompanyContext';

const CompanyList = () => {
  const { companies } = useContext(CompanyContext);
  const { deleteCompany } = useContext(CompanyContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Companies</h1>
      <input
      type = "text"
      placeholder = "Search Companies"
      value = {searchTerm}
      onChange = {(event) => setSearchTerm(event.target.value)}
      />
      <ul>
        {filteredCompanies.map(company => 
        <li key={company._id}>{company.name} <button onClick={() => deleteCompany(company._id)}>Delete</button></li>)}
      </ul>
    </div>
  );
};

export default CompanyList;