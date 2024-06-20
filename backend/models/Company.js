const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
    name: { type: String, required: true },
    website: { type: String},
    industry: { type: String},
    companyLinkedin: { type: String},
    contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact' }]
});

module.exports = mongoose.model('Company', CompanySchema);