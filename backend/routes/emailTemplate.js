const express = require('express');
const router = express.Router();
const EmailTemplate = require('../models/EmailTemplate');

// Create a new email template
router.post('/', async (req, res) => {
    try {
        const emailTemplate = new EmailTemplate(req.body);
        await emailTemplate.save();
        res.status(201).send(emailTemplate);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all email templates
router.get('/', async (req, res) => {
    try {
        const emailTemplates = await EmailTemplate.find();
        res.send(emailTemplates);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a specific email template
router.get('/:id', async (req, res) => {
    try {
        const emailTemplate = await EmailTemplate.findById(req.params.id);
        if (!emailTemplate) {
            return res.status(404).send();
        }
        res.send(emailTemplate);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update an email template
router.patch('/:id', async (req, res) => {
    try {
        const emailTemplate = await EmailTemplate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!emailTemplate) {
            return res.status(404).send();
        }
        res.send(emailTemplate);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete an email template
router.delete('/:id', async (req, res) => {
    try {
        const emailTemplate = await EmailTemplate.findByIdAndDelete(req.params.id);
        if (!emailTemplate) {
            return res.status(404).send();
        }
        res.send(emailTemplate);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;