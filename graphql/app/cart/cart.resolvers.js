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
            console.log('carts', args);
            let limit = 20;
            let offset = 0;
            
            const restaurantCodes = args.cart.restaurantCodes;
            if (typeof args.cart.pageInfo !== 'undefined') {
                if (typeof args.cart.pageInfo.offset !== 'undefined') offset = args.cart.pageInfo.offset;
                if (typeof args.cart.pageInfo.limit !== 'undefined') limit = args.cart.pageInfo.limit;
            }

            const result = await Restaurant.find({code: { $in: restaurantCodes}})
                .then(restaurant => {
                    if (!restaurant) throw new Error(constants.ERROR_RESTAURANT_NOT_FOUND);
                    console.log('carts rest', restaurant);
                    var options = {
                        sort:     { 'addedOn': -1 },
                        populate: 'soldItems',
                        lean:     true,
                        offset, 
                        limit
                    };
                    
                    return Cart.paginate({restaurant: restaurant}, options)
                        .then(response => {
                            console.log('carts response -------', response);
                            
                            return {
                                    data: response.docs,
                                    pageInfo: {
                                        limit: response.limit,
                                        total: response.total,
                                        offset: response.offset
                                    }
                                
                            }
                        })
                        .catch(err => {
                            console.log(constants.ERROR_WHILE_FETCHING_CART, err.message);
                            throw err
                        });
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