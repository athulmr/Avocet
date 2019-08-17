const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const itemSchema = Schema({
    category: {
        type: Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    code: {
        type: String,
        required: true,
        maxlength: 10,
    },
    desc: {
        type: String,
        maxlength: 240
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
    },
    active: {
        type: Boolean,
        required: true
    }
})

itemSchema.index({name:1, category:1}, { unique: true });
itemSchema.index({code:1, category:1}, { unique: true });

itemSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Item', itemSchema);
