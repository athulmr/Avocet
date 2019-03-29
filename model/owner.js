const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const ownerSchema = Schema({
    resturants: [{
        resturantId: {
            type: Schema.ObjectId,
            ref: 'Resturant'
        }
    }],
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
    pwd: {
        type: String,
        required: true
    },
    dob: Date,
    sex: String
});

mongoose.plugin(uniqueValidator);

module.exports = mongoose.model('Owner', ownerSchema);
