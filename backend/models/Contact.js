const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    linkedIn: { type: String },
    position: { type: String },
    company: { type: Schema.Types.ObjectId, ref: 'Company' }
});

module.exports = mongoose.model('Contact', ContactSchema);