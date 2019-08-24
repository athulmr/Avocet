const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = Schema({
    menu: {
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

categorySchema.index({name:1, menu:1}, { unique: true });

module.exports = mongoose.model('Category', categorySchema);
