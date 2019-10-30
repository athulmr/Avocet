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
                            soldItemsInput.forEach(soldItem => {
                                soldItem.restaurant = restaurant._id;
                                soldItem.cart = savedCart._id; 
                                soldItem.addedOn = savedCart.addedOn;
                                soldItem.totalCost = soldItem.unitPrice * soldItem.qty; 
                                soldItemList.push(soldItem);
                            });
                            soldItem.collection.insertMany(soldItemList, function (err, docs) {
                                if (err){ 
                                    return console.error(err);
                                } else {
                                  console.log("Multiple documents inserted to Collection", docs);
                                  savedCart.soldItems = Object.values(docs.insertedIds)
                                  console.log('savedSa = >',savedCart);
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
    }

    
}