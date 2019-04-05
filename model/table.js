const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const tableSchema = Schema({
    resturantId : {
        type: Schema.ObjectId,
        ref: 'Resturant'
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    },
    occupied: {
        type: Boolean,
        default: false
    },
    bookingStatus: [{
        sDate: Date,
        eDate: Date,
        customer: {
            type: Schema.ObjectId,
            ref: 'Customer'
        }
    }],
    addedOn: {
        type: Date,
        required: true
    }
});

tableSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Table', tableSchema);