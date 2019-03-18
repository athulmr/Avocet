const express = require('express');

const Item = require('../model/item');
const Offer = require('../model/offer');


const router = express.Router();


router.get('', (req, res) => {
    Item.find()
        .then(data => {
            res.status(200).json({
                'items': data
            });
        });
});

router.post('', (req, res) => {
        saveItem(req.body, res);
});


/**
 * Saves the item to database
 * @param {HTTP.request.body} reqBody - request Body containing all the form data
 * @param {HTTP.response} res - response object from sending response 
 */
saveItem = (reqBody, res) => {
    let item = new Item(reqBody);
    item.save((err, data) => {

        if (!err) {
            res.status(200).json({
                'item': data
            });
        } else {
            console.log(err);
            res.status(503).json({
                'message': 'Internal Server Error'
            });
        }

    });
}

module.exports = router;