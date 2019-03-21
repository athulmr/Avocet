const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ownerSchema = Schema({
    name: {
        type: String,
        required: true
    },
    contacts : {
        address: String,
        phone: [Number],
        email: [String],
        required: true
    },
    dob: Date,
    sex: String,
    resturants : [{
        resturantId : {
            type: Schema.ObjectId,
            ref: 'Resturant'
        }
    }]
});

module.exports = mongoose.model('Owner', ownerSchema);
