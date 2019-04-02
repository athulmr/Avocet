const mongoose = require('mongoose');

const Schema = mongoose.Schema;
/**
 * Resturant act as a parent to all other models.
 * _id is used in all other models to tag it with their resturant.
 * Resturant can have multiple Owners and Staffs
 */
const resturantSchema = Schema({
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
    }
});

module.exports = mongoose.model('Resturant', resturantSchema);
