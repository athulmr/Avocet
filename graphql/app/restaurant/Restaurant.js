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
        unique: true
    },
    address: {
        type: String,
        unique: true
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
    menu: {
        type: Schema.ObjectId,
        ref: 'Menu'
    },
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

module.exports = mongoose.model('Restaurant', restaurantSchema);
