const restful = require('node-restful');
const mongoose = restful.mongoose;

const creditSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, required: true, min: 0 }
});

const debtSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, required: true, min: 0 },
    status: { type: String, required: false, uppercase: true, enum: ['PAGO', 'PENDENTE', 'AGENDADO'] }
});

const billingCycle = new mongoose.Schema({
    name: { type: String, required: true },
    month: { type: Number, required: true, min: 1, max: 12 },
    year: { type: Number, required: true, min: 1970, max: 2100 },
    credits: [creditSchema],
    debts: [debtSchema]
});

module.exports = restful.model('BillingCycle', billingCycle);