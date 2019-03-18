const mongoose = require('mongoose');

const Item = require('./item');

const Schema = mongoose.Schema;

const offerSchema = Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    desc: String,
    imgUrl: String,
    startDate: Date,
    endDate: Date,
    items: [{
        type: Schema.ObjectId,
        ref: 'Item'
    }]
});



module.exports = mongoose.model('Offer', offerSchema);