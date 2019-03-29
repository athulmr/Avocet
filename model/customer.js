const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const CustomerSchema = Schema({
    resturantId: {
        type: Schema.ObjectId,
        ref: 'Resturant'
    },
    name: {
        type: String,
        required: true
    },
    contacts: {
        address: String,
        phone: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        }
    },
    dob: Date,
    sex: String
});

module.exports = mongoose.model('Owner', ownerSchema);