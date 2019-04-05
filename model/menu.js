const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuSchema = Schema({
    resturnat: {
        type: Schema.ObjectId,
        ref: 'Restaurant',
        require: true,
    },
    items: [{
        type: Schema.ObjectId,
        ref: 'Item'
    }],
    name: {
        type: String,
        required: true
    },
    addedOn: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Menu', menuSchema);
