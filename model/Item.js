const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const itemSchema = Schema({
    restaurant: {
        type: Schema.ObjectId,
        ref: 'Restaurant',
        require: true,
    },
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
        type: Date
    },
    active: {
        type: Boolean
    }
})

itemSchema.pre('save', async function (next) {
    try {
      // set addedOn date
      this.addedOn = new Date();
      this.active = true;
      this.code = this.code.toUpperCase();

      next();
    } catch (error) {
      next(error);
    }
  });

itemSchema.index({name:1, restaurant:1}, { unique: true });
itemSchema.index({code:1, restaurant:1}, { unique: true });

itemSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Item', itemSchema);
