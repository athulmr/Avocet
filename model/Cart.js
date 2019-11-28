const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = Schema({
    restaurant: {
        type: Schema.ObjectId,
        ref: 'Restaurant',
        require: true
    },
    soldItems: [{
        type: Schema.ObjectId,
        ref: 'SoldItem'
    }],
    delivery: {
        code: String,
        pkgCharge: Number,
        fcpo: Number,
        fcpoMinOrder: Number,
        discounts: [{
            percent: Number,
            minOrder: Number,
            maxDiscount: Number,
        }],
    },
    value: Number,
    addedOn: {
        type: Date,
        require: true
    }
    
});

cartSchema.pre('save', async function (next) {
    try {
        this.addedOn = new Date();
        next();        
    } catch (error) {
        next(error);
    }
})

module.exports = mongoose.model('Cart', cartSchema);