const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const Contact = require('../models/Contact');

// Create a company
router.post('/', async (req, res) => {
    try {
        const company = new Company(req.body);
        await company.save();
        res.status(201).send(company);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

// Get all companies
router.get('/', async (req, res) => {
    try {
        const companies = await Company.find().populate('contacts');
        res.status(200).send(companies);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Get a specific company
router.get('/:id', async (req, res) => {
    const companyId = req.params.id;
    try {
        const company = await Company.findById(companyId).populate('contacts');
        if (!company) {
            return res.status(404).send('Company not found');
        }
        res.status(200).send(company);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

//Update a copmany
router.patch('/:id', async (req, res) => {
    const companyId = req.params.id;
    try {
        const company = await Company.findByIdAndUpdate(companyId, req.body, { new: true, runValidators: true });
        if (!company) {
            return res.status(404).send('Company not found');
        }
        res.status(200).send(company);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

//Delete a company
router.delete('/:id', async (req, res) => {
    const companyId = req.params.id;
    try {
        const company = await Company.findByIdAndDelete(companyId);
        if (!company) {
            return res.status(404).send('Company not found');
        }

        res.status(200).send(company);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = router;