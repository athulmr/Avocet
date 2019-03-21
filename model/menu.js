const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuSchema = Schema({
    resturnatId: {
        type: Schema.ObjectId,
        ref: 'Resturant',
        require: true,
    },
    items: [{
        type: Schema.ObjectId,
        ref: 'Item'
    }],
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Menu', menuSchema);