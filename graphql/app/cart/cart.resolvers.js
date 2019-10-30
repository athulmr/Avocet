const Cart = require('../../../model/Cart');
const ItemSold = require('../../../model/ItemSold');
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
            const itemsSoldInput = args.cart.itemsSold;
            
            delete cartInput.itemsSold;
            console.log(cartInput);
            console.log(itemsSoldInput);
            
            const result = await Restaurant.findById(cartInput.restaurant)
                .then(restaurant => {
                    if (!restaurant) throw new Error('Restaurant not found');
                    console.log('In');

                    const cart = new Cart(cartInput);
                    console.log('CartInput');

                    return cart.save()
                        .then(savedCart => {
                            const itemsSold = new ItemSold();
                            let itemSoldList = [];
                            itemsSoldInput.forEach(itemSold => {
                                itemSold.restaurant = restaurant._id;
                                itemSold.cart = savedCart._id; 
                                itemSold.addedOn = savedCart.addedOn;
                                itemSold.totalCost = itemSold.unitPrice * itemSold.qty; 
                                itemSoldList.push(itemSold);
                            });
                            itemsSold.collection.insertMany(itemSoldList, function (err, docs) {
                                if (err){ 
                                    return console.error(err);
                                } else {
                                  console.log("Multiple documents inserted to Collection", docs);
                                  savedCart.itemsSold = Object.values(docs.insertedIds)
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