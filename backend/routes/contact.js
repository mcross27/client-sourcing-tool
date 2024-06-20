const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
const Contact = require('../models/Contact');

// Create a contact
router.post('/', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        const company = await Company.findById(contact.company);
        company.contacts.push(contact._id);
        await company.save();
        res.status(201).send(contact);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

// Get all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().populate('company');
        res.status(200).send(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Get a specific contact
router.get('/:id', async (req, res) => {
    const contactId = req.params.id;
    try {
        const contact = await Contact.findById(contactId).populate('company');
        if (!contact) {
            return res.status(404).send('Contact not found');
        }
        res.status(200).send(contact);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

//Update a contact
router.patch('/:id', async (req, res) => {
    const contactId = req.params.id;
    try {
        const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true, runValidators: true });
        if(!contact) {
            return res.status(404).send('Contact not found');
        }
        return res.status(200).send(contact);
    } catch (error) {
        console.error(error);
        res.status(400).send(error);
    }
});

//Delete a contact
router.delete('/:id', async (req, res) => {
    const contactId = req.params.id;
    try {
        const contact = await Contact.findByIdAndDelete(contactId);
        if (!contact) {
            return res.status(404).send('Contact not found');
        }
        const company = await Company.findById(contact.company);
        company.contacts = company.contacts.filter((contact) => contact.toString() !== contactId);
        await company.save();
        res.status(200).send(contact);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = router;