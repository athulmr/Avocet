const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSoldSchema = Schema({
    restaurant: {
        type: Schema.ObjectId,
        ref: 'Restaurant',
        require: true
    },
    saleOrder: {
        type: Schema.ObjectId,
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
    },
    addedOn: {
        type: Date,
        require: true
    }   
    
});

module.exports = mongoose.model('ItemSold', itemSoldSchema);