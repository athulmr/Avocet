const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSold = Schema({
    restaurant: {
        type: Schema.objectId,
        ref: 'Restaurant',
        require: true
    },
    SaleOrder: {
        type: Schema.objectId,
        ref: 'SaleOrder',
        require: true
    },
    name: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    },
    qty: {
        type: Number,
        require: true
    },
    unitPrice: {
        type: Number,
        require: true
    },
    totalCost: {
        type: Number,
        require: true
    }   
    
});

module.exports = mongoose.model('ItemSold', itemSold);