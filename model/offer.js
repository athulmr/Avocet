const mongoose = require('mongoose');

const Item = require('./item');

const Schema = mongoose.Schema;

const offerSchema = Schema({
    resturantId: {
        type: Schema.ObjectId,
        ref: 'Resturant'
    },
    items: [{
        type: Schema.ObjectId,
        ref: 'Item'
    }],
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
    endDate: Date
});



module.exports = mongoose.model('Offer', offerSchema);