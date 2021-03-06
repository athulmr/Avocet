const Category = require('../../../model/Category');
const Item = require('../../../model/Item');
const Restaurant = require('../../../model/Restaurant');

module.exports = {
    /**
     * Creates Items and Add them to Menu's items List.
     * @param {ItemInput} args Contains details about item and menuId.
     */
    createItem: async args => {
        console.log("Resolver: createItem", args);

        try {
            if (!args) {
                throw new Error("Didn't receive any argument");
            }
            const itemInput = JSON.parse(JSON.stringify(args.itemInput));

            // check if the menu id received is valid or not
            let savedItem = null;
            
            if (typeof itemInput._id === 'undefined') {
                const categoryId = itemInput.category;
                const category = await Category
                .findById(categoryId)
                .catch(err => {
                    throw new Error("Category do not exist")
                    });
                
                // save the item
                itemInput.restaurant = category.restaurant;
                savedItem = await Item.create(itemInput)
                .then(savedItem => {

                    category.items.push(savedItem);
                    return category.save()
                    .then(()=>{
                        console.log('item added to category', savedItem);
                        return savedItem;
                    })
                });
            } 
            else {
                // If item ID already exist then search for that Item and update it.
                return Item.findById(itemInput._id)
                .then(item => {
                    // Update only price, name and packaging charges
                    item.price = itemInput.price;
                    item.name = itemInput.name;
                    item.pkgChrg = itemInput.pkgChrg;

                    return item.save()
                    .then(savedItem => {                            
                        return savedItem;
                    })

                })
            }

            return savedItem;
            
        } catch (err) {
            throw err;
        }
    },

    /**
     * Retrieve Items from the database.
     * @param {Item} args
     */
    items: async args => {
        try {
            if (!args) {
                throw new Error("Didn't receive any argument");
            }

            // change name to regex type to fetch results with same keyword in it.
            if (typeof args.item.name !== 'undefined') {
                args.item.name = await {
                    $regex: '.*' + args.item.name + '.*',
                    $options: 'i'
                };
            }
            const restaurantId = args.item.restaurant;
            const itemList = await Restaurant.findById(restaurantId)
            .then(restaurant => {
                console.log('found restaurant', restaurant.name);

                return Item.find({restaurant})
                .then(items => {
                    console.log('items ', items);
                    
                    return items;
                });
            })

            console.log('itemList', itemList);
            
            return itemList;
        } catch (err) {
            return err;
        }
    },

    /**
     * Delete Item from the database
     * @param {ID} args
     */
    deleteItem: async args => {
        // TODO have to check if the item is in the current users Restaurants menu.
        console.log("deleteItem Mutation")
        try {
            if (!args.id) {
                throw new Error("Didn't receive any ID in argument");
            }
            // Get ID of the item from the args.
            const itemId = args.id;
            // Delete item by ID from database
            const result = await Item.deleteOne({
                '_id': itemId
            }).then(data => {
                return data;
            });
            if (result.deletedCount == 1) {
                return {
                    'status': true
                };
            }
            return {
                'status': false
            };
        } catch (error) {
            return err;
        }
    }
}