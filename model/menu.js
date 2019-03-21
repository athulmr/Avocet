const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuSchema = Schema({
    resturnatId: {
        type: Schema.ObjectId,
        ref: 'Resturant',
        require: true,
    },
    name: {
        type: String,
        required: true
    },
    items: [{
        type: Schema.ObjectId,
        ref: 'Item'
    }]
});

module.exports = mongoose.model('Menu', menuSchema);
