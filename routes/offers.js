const express = require('express');

const Offer = require('../model/offer');

const router = express.Router();

router.get('', (req, res) => {
    Offer.find()
    .then(data => {
        res.status(200).json({
            'offers': data
        });
    });
});

router.post('', (req, res) => {
    let offer = new Offer(req.body);
    offer.save((err, data) => {
        if(!err){

            res.status(200).json({
                'offer': data
            });
        } else {

            res.status(503).json({
                'message': 'Internal Server Error' 
            });
        }

    });

});

module.exports = router;