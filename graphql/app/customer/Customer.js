const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const CustomerSchema = Schema({
    restaurantId: {
        type: Schema.ObjectId,
        ref: 'Restaurant'
    },
    name: {
        type: String,
        required: true
    },
    address: String,
    phone: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true

    },
    dob: Date,
    sex: String,
    addedOn: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Owner', ownerSchema);