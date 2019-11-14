const mongoose = require('mongoose');

const Schema = mongoose.Schema;
/**
 * Config contains configuration details such as delivery type,
 * discount details and package charges etc.
 */
const configSchema = Schema({
    restaurant: {
        type: Schema.ObjectId,
        ref: 'Restaurant',
        require: true,
    },
    delivery: [{
        code: String,
        pkgCharge: Number,
        fcpo: Number,
        fcpoMinOrder: Number,
        discounts: [{
            percent: Number,
            minOrder: Number,
            maxDiscount: Number,
            active: Boolean
        }],
        default: Boolean,
        active: Boolean,
    }],
    gstin: Number,
    cgst: Number,
    sgst: Number,
    addedOn: Date,
    active: Boolean
});

configSchema.pre('save', async function (next) {
    try {
      // set addedOn date
      this.addedOn = new Date();
      this.active = true;

      next();
    } catch (error) {
      next(error);
    }
});

// Only one config for a restaurant.
configSchema.index({restaurant:1}, { unique: true });


module.exports = mongoose.model('Config', configSchema);
