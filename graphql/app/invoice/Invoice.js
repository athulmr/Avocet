const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const invoiceSchema = Schema({
    sale: {
        type: Schema.ObjectId,
        required: true
    },
    amount: Number,
    gstAmt: Number,
    totalAmt: Number,
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Invoice", invoiceSchema);
