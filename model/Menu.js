const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const menuSchema = Schema({
    restaurant: {
        type: Schema.ObjectId,
        ref: 'Restaurant',
        require: true,
    },
    categories: [{
        type: Schema.ObjectId,
        ref: 'Category'
    }],
    name: {
        type: String,
        required: true
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

menuSchema.index({name:1, restaurant:1}, { unique: true });


module.exports = mongoose.model('Menu', menuSchema);
