const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const saleOrderSchema = Schema({
    restaurant: {
        type: Schema.ObjectId,
        ref: 'Restaurant',
        require: true
    },
    itemsSold: [{
        type: Schema.ObjectId,
        ref: 'ItemSold'
    }],
    addedOn: {
        type: Date,
        require: true
    }
    
});

saleOrderSchema.pre('save', async function (next) {
    try {
        this.addedOn = new Date();
        next();        
    } catch (error) {
        next(error);
    }
})

module.exports = mongoose.model('SaleOrder', saleOrderSchema);