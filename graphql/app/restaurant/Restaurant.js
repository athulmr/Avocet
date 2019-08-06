const mongoose = require('mongoose');

const Schema = mongoose.Schema;
/**
 * Restaurant act as a parent to all other models.
 * _id is used in all other models to tag it with their restaurant.
 * Restaurant can have multiple Owners and Staffs
 */
const restaurantSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        maxlength: 4
    },
    address: {
        type: String,
    },
    phone: [String],
    email: [String],
    owners: {
        type: [Schema.ObjectId],
        ref: 'Owner',
        required: true
    },
    staffs: {
        type: [Schema.ObjectId],
        ref: 'Staff'
    },
    menus: [{
        type: Schema.ObjectId,
        ref: 'Menu'
    }],
    img: {
        logo: String,
        banner: String,
        background: String
    },
    addedOn: {
        type: Date,
        required: true
    }
});

menuSchema.index({name:1, owners:1}, { unique: true });
menuSchema.index({name:1, address:1}, { unique: true });
menuSchema.index({code:1, owners:1}, { unique: true });


module.exports = mongoose.model('Restaurant', restaurantSchema);
