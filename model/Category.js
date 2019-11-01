const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = Schema({
    restaurant: {
        type: Schema.ObjectId,
        ref: 'Restaurant',
        require: true,
    },
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
        type: Date
    },
    active: {
        type: Boolean
    }
});


categorySchema.pre('save', async function (next) {
    try {
      // set addedOn date
      this.addedOn = new Date();
      this.active = true;

      next();
    } catch (error) {
      next(error);
    }
  });

categorySchema.index({name:1, menu:1}, { unique: true });

module.exports = mongoose.model('Category', categorySchema);
