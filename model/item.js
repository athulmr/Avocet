const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const itemSchema = Schema({
    menu: {
        type: Schema.ObjectId,
        ref: 'Menu',
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String
    },
    desc: {
        type: String
    },
    category: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgUrl: [String],
    count: Number,
    addedOn: {
        type: Date,
        required: true
    }
})

itemSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Item', itemSchema);
