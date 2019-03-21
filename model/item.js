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
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
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
})

itemSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Item', itemSchema);
