const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const ownerSchema = Schema({
    resturants: {
        type: [Schema.ObjectId],
        ref: 'Resturant',
        required: true
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
    pwd: {
        type: String,
        required: true
    },
    dob: Date,
    sex: String,
    addedOn: {
        type: Date,
        required: true
    }
});

mongoose.plugin(uniqueValidator);

module.exports = mongoose.model('Owner', ownerSchema);