const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailTemplateSchema = new Schema({
    name: { type: String, required: true },
    subjectA: { type: String, required: true },
    bodyA: { type: String, required: true },
    subjectB: { type: String },
    bodyB: { type: String },
    isABTest: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EmailTemplate', EmailTemplateSchema);