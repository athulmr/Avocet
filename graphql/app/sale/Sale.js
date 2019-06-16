const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const saleSchema = Schema({
    restaurant: {
        type: Schema.ObjectId,
        ref: "Restaurant",
        required: true
    },
    staff: {
        type: Schema.ObjectId,
        ref: "Staff",
        required: true
    },
    customer: {
        type: Schema.ObjectId,
        ref: "Customer",
        required: true
    },
    items: [{
        item: {
            type: Schema.ObjectId,
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
    }],
    addedOn: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Sale', saleSchema);