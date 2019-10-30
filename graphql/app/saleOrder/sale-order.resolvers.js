const SaleOrder = require('../../../model/SaleOrder');
const ItemSold = require('../../../model/ItemSold');
const Restaurant = require('../../../model/Restaurant');


module.exports = {
    /**
     * Creates Items and Add them to Menu's items List.
     * @param {ItemInput} args Contains details about item and menuId.
     */
    createSaleOrder: async args => {
        try {
            if (!args) throw new Error("Args are empty, check if you are passing 'variables' or not")
            const saleOrderInput = args.saleOrder;
            const itemsSoldInput = args.saleOrder.itemsSold;
            
            delete saleOrderInput.itemsSold;
            console.log(saleOrderInput);
            console.log(itemsSoldInput);
            
            const result = await Restaurant.findById(saleOrderInput.restaurant)
                .then(restaurant => {
                    if (!restaurant) throw new Error('Restaurant not found');
                    console.log('In');

                    const saleOrder = new SaleOrder(saleOrderInput);
                    console.log('saleOrderInput');

                    return saleOrder.save()
                        .then(savedSaleOrder => {
                            const itemsSold = new ItemSold();
                            let itemSoldList = [];
                            itemsSoldInput.forEach(itemSold => {
                                itemSold.restaurant = restaurant._id;
                                itemSold.saleOrder = savedSaleOrder._id; 
                                itemSold.addedOn = savedSaleOrder.addedOn;
                                itemSold.totalCost = itemSold.unitPrice * itemSold.qty; 
                                itemSoldList.push(itemSold);
                            });
                            itemsSold.collection.insertMany(itemSoldList, function (err, docs) {
                                if (err){ 
                                    return console.error(err);
                                } else {
                                  console.log("Multiple documents inserted to Collection", docs);
                                  savedSaleOrder.itemsSold = Object.values(docs.insertedIds)
                                  console.log('savedSa = >',savedSaleOrder);
                                  savedSaleOrder.save();
                                }
                            });
                            
                            return {
                                data: [savedSaleOrder]
                            };
                        })
                        .catch(err => {
                            console.log("saleOrder Unable to save New data to DB", err.message);
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