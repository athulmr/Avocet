const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = Schema({
    restaurantId: {
        type: Schema.ObjectId,
        ref: 'Restaurant',
        require: true
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
    approved: Boolean,
    addedOn: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Staff', staffSchema);
