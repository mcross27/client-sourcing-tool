import React, { useState, useContext } from 'react';
import { CompanyContext } from '../contexts/CompanyContext';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon, Add as AddIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const CompanyTable = ({ data, columns, updateData, deleteData }) => {
    const { companies, addCompany, editCompany, deleteCompany } = useContext(CompanyContext);
    const [editIdx, setEditIdx] = useState(-1);
    const [currentCompany, setCurrentCompany] = useState({});
    const [ newCompany, setNewCompany ] = useState({
        name: '',
        website: '',
        industry: '',
        companyLinkedin: ''
    });

    const handleEdit = (index, company) => {
        setEditIdx(index);
        setCurrentCompany(company);
    };

    const handleSave = async (id) => {
        await editCompany(id, currentCompany);
        setEditIdx(-1);
    };

    const handleChange = (event) => {
        setCurrentCompany({ ...currentCompany, [event.target.name]: event.target.value });
    };

    const handleAdd = async () => {
        await addCompany(newCompany);
        setNewCompany({
            name: '',
            website: '',
            industry: '',
            companyLinkedin: ''
        });
    };

    const handleNewChange = (event) => {
        setNewCompany({ ...newCompany, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <h1>Companies</h1>
                <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Website</TableCell>
                            <TableCell>Industry</TableCell>
                            <TableCell>LinkedIn</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {companies.map((company, index) => (
                            <TableRow key={company._id}>
                                <TableCell>
                                    {editIdx === index ? (
                                        <TextField
                                            name="name"
                                            value={currentCompany.name}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        <Link to={`/company/${company._id}/contacts`}>{company.name}</Link>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIdx === index ? (
                                        <TextField
                                            name="website"
                                            value={currentCompany.website}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        company.website
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIdx === index ? (
                                        <TextField
                                            name="industry"
                                            value={currentCompany.industry}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        company.industry
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIdx === index ? (
                                        <TextField
                                            name="companyLinkedin"
                                            value={currentCompany.companyLinkedin}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        company.companyLinkedin
                                    )}
                                </TableCell>
                                <TableCell>
                                    {editIdx === index ? (
                                        <IconButton onClick={() => handleSave(company._id)}>
                                            <SaveIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick={() => handleEdit(index, company)}>
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                    <IconButton onClick={() => deleteCompany(company._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell>
                                <TextField
                                    name="name"
                                    value={newCompany.name}
                                    onChange={handleNewChange}
                                    placeholder='Name'
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="website"
                                    value={newCompany.website}
                                    onChange={handleNewChange}
                                    placeholder='Website'
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="industry"
                                    value={newCompany.industry}
                                    onChange={handleNewChange}
                                    placeholder='Industry'
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    name="companyLinkedin"
                                    value={newCompany.companyLinkedin}
                                    onChange={handleNewChange}
                                    placeholder='Company LinkedIn'
                                />
                            </TableCell>
                            <TableCell>
                                <IconButton onClick={handleAdd}>
                                    <AddIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CompanyTable;