const Cart = require('../../../model/Cart');
const SoldItem = require('../../../model/SoldItem');
const Restaurant = require('../../../model/Restaurant');
const constants = require('../../../constants/constants');


module.exports = {
    /**
     * Saves cart along with the items sold.
     * @param {cart} args Contains details about cart and items sold.
     */
    saveCart: async args => {
        try {
            if (!args) throw new Error(constants.ERROR_EMPTY_ARGS)
            const cartInput = args.cart;
            const soldItemsInput = args.cart.soldItems;
            
            delete cartInput.soldItems;
            console.log('saveCart cartInput', cartInput);
            console.log('saveCart soldItemsInput', soldItemsInput);
            
            const result = await Restaurant.findById(cartInput.restaurant)
                .then(restaurant => {
                    if (!restaurant) throw new Error(constants.ERROR_RESTAURANT_NOT_FOUND);
                    const cart = new Cart(cartInput);
                    return cart.save()
                        .then(savedCart => {
                            const soldItem = new SoldItem();
                            let soldItemList = [];
                            let cartValue = 0;
                            soldItemsInput.forEach(soldItem => {
                                soldItem.restaurant = restaurant._id;
                                soldItem.cart = savedCart._id; 
                                soldItem.addedOn = savedCart.addedOn;
                                soldItem.totalCost = soldItem.unitPrice * soldItem.qty; 
                                soldItemList.push(soldItem);
                                cartValue += soldItem.totalCost;
                            });
                            soldItem.collection.insertMany(soldItemList, function (err, docs) {
                                if (err){ 
                                    return Error(err);
                                } else {
                                  savedCart.soldItems = Object.values(docs.insertedIds)
                                  savedCart.value = cartValue;
                                  savedCart.save();
                                }
                            });
                            // console.log('savedCart', savedCart);
                            
                            return {
                                data: [savedCart]
                            };
                        })
                        .catch(err => {
                            console.log(constants.ERROR_WHILE_SAVING_CART, err.message);
                            throw err;
                        });
                })
                .catch(err => {
                    console.error(constants.ERROR_RESTAURANT_NOT_FOUND,err.message);
                    throw Error(constants.ERROR_RESTAURANT_NOT_FOUND);
                });


            return result;

        } catch (err) {
            throw Error(constants.ERROR_WHILE_SAVING_CART +' '+ err.message);
        }
    },

    /**
     * Retrieves all the carts based on restaurant code and timeline (default timeline is 7 days)
     */
    carts: async args => {
        try {
            if (!args) throw new Error(constants.ERROR_EMPTY_ARGS);
            const restaurantCode = args.cart.restaurant;
            const result = await Restaurant.find({code: restaurantCode})
                .then(restaurant => {
                    if (!restaurant) throw new Error(constants.ERROR_RESTAURANT_NOT_FOUND);
                    
                    return Cart.find({restaurant: restaurant})
                        .populate('soldItems')
                        .sort({'addedOn': -1})
                        .limit(100)
                        .then(carts => {
                            return {
                                data: carts
                            };
                        })
                        .catch(err => {
                            console.log(constants.ERROR_WHILE_FETCHING_CART, err.message);
                            return {
                                error: err.message
                            };
                        });
                })
                .catch(err => {
                    console.log(constants.ERROR_WHILE_FETCHING_CART, err);
                    return {
                        error: err.message
                    };
                });


            return result;

        } catch (err) {
            throw err;
        }

    }


}