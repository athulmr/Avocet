const mongoose = require('mongoose');

const Schema = mongoose.Schema;
/**
 * Restaurant act as a parent to all other models.
 * _id is used in all other models to tag it with their restaurant.
 * Restaurant can have multiple Owners.
 */
const restaurantSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        maxlength: 15
    },
    address: {
        type: String,
    },
    phone: [String],
    email: [String],
    owners: {
        type: [Schema.ObjectId],
        ref: 'User',
        required: true
    },
    menus: [{
        type: Schema.ObjectId,
        ref: 'Menu'
    }],
    config: {
        type: Schema.ObjectId,
        ref: 'Config'
    },
    img: {
        logo: String,
        banner: String,
        background: String
    },
    addedOn: {
        type: Date
    },
    active: {
        type: Boolean
    }
});

restaurantSchema.pre('save', async function (next) {
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

restaurantSchema.index({name:1, address:1}, { unique: true });
restaurantSchema.index({code:1}, { unique: true });


module.exports = mongoose.model('Restaurant', restaurantSchema);
