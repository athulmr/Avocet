const Cart = require('../../../model/Cart');
const SoldItem = require('../../../model/SoldItem');
const Restaurant = require('../../../model/Restaurant');
const constants = require('../../../constants/constants');
const helpers = require('./insight.helpers');


module.exports = {
    /**
     * Retrieves all the carts based on restaurant code and timeline (default timeline is 7 days)
     */
    insights: async args => {
        try {
            if (!args) throw new Error(constants.ERROR_EMPTY_ARGS);
            console.log('insights', args);
            
            const restaurantCodes = args.insight.restaurantCodes;

            const result = await Restaurant.find({code: { $in: restaurantCodes}})
                .then(restaurant => {
                    if (!restaurant) throw new Error(constants.ERROR_RESTAURANT_NOT_FOUND);
                    return Cart.find({restaurant: restaurant})
                    .then( carts => {
                        const insights = helpers.generateInsight(carts);
                        // console.log(insights);
                       return {
                           earnings: insights.earnings,
                           orders: insights.orders
                       }
                    })

                })
                .catch(err => {
                    console.log(constants.ERROR_WHILE_FETCHING_CART, err);
                    throw err;
                });

            return result;

        } catch (err) {
            throw err;
        }

    }


}