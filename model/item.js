const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const itemSchema = Schema({
    name: {
        type: String,
        required: true
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

module.exports = mongoose.model('Item', itemSchema);