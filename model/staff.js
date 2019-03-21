const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = Schema({
    resturantId : {
        type: Schema.ObjectId,
        ref: 'Resturant',
        require: true
    },
    name: {
        type: String,
        required: true
    },
    contacts : {
        address: String,
        phone: [Number],
        email: [String],
        required: true
    },
    dob: Date,
    sex: String,
    approved: Boolean
});

module.exports = mongoose.model('Staff', staffSchema);
