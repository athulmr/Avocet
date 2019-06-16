const mongoose = require('mongoose');

const Item = require('../graphql/item/Item');

const Schema = mongoose.Schema;

const offerSchema = Schema({
    restaurantId: {
        type: Schema.ObjectId,
        ref: 'Restaurant'
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
    endDate: Date,
    addedOn: {
        type: Date,
        required: true
    }
});



module.exports = mongoose.model('Offer', offerSchema);