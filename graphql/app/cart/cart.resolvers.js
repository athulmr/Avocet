const Cart = require('../../../model/Cart');
const SoldItem = require('../../../model/SoldItem');
const Restaurant = require('../../../model/Restaurant');


module.exports = {
    /**
     * Saves cart along with the items sold.
     * @param {cart} args Contains details about cart and items sold.
     */
    saveCart: async args => {
        try {
            if (!args) throw new Error("Args are empty, check if you are passing 'variables' or not")
            const cartInput = args.cart;
            const soldItemsInput = args.cart.soldItems;
            
            delete cartInput.soldItems;
            console.log(cartInput);
            console.log(soldItemsInput);
            
            const result = await Restaurant.findById(cartInput.restaurant)
                .then(restaurant => {
                    if (!restaurant) throw new Error('Restaurant not found');
                    console.log('In');

                    const cart = new Cart(cartInput);
                    console.log('CartInput');

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
                                    return console.error(err);
                                } else {
                                //   console.log("Multiple documents inserted to Collection", docs);
                                  savedCart.soldItems = Object.values(docs.insertedIds)
                                  savedCart.value = cartValue;
                                  savedCart.save();
                                }
                            });
                            
                            return {
                                data: [savedCart]
                            };
                        })
                        .catch(err => {
                            console.log("Cart Unable to save New data to DB", err.message);
                            return {
                                error: err.message
                            };
                        });
                })
                .catch(err => {
                    console.log("Restaurant do not Exist",err);
                    return {
                        error: err.message
                    };
                });


            return result;

        } catch (err) {
            throw err;
        }
    },

    /**
     * Retrieves all the carts based on restaurant code and timeline (default timeline is 7 days)
     */
    carts: async args => {
        try {
            if (!args) throw new Error("Args are empty, check if you are passing 'variables' or not")
            const restaurantCode = args.cart.restaurant;
            const result = await Restaurant.find({code: restaurantCode})
                .then(restaurant => {
                    if (!restaurant) throw new Error('Restaurant not found');
                    
                    return Cart.find({restaurant: restaurantCode})
                        .populate('soldItems')
                        .sort({'addedOn': -1})
                        .limit(100)
                        .then(carts => {
                            console.log("Unable to fetch carts from DB", carts)
                            return {
                                data: carts
                            };
                        })
                        .catch(err => {
                            console.log("Unable to fetch carts from DB", err.message);
                            return {
                                error: err.message
                            };
                        });
                })
                .catch(err => {
                    console.log("Error while fetching carts", err);
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