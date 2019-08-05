const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = Schema({
    restaurant: {
        type: Schema.ObjectId,
        ref: 'Menu',
        require: true,
    },
    items: [{
        type: Schema.ObjectId,
        ref: 'Item'
    }],
    name: {
        type: String,
        required: true,
        unique: true
    },
    addedOn: {
        type: Date,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Category', categorySchema);
