const Menu = require('../menu/Menu');
const Item = require('./Item');

module.exports = {
    /**
     * Creates Items and Add them to Menu's items List.
     * @param {ItemInput} args Contains details about item and menuId.
     */
    createItems: async args => {
        console.log("Resolver: createItems", args);

        try {
            if (!args) {
                throw new Error("Didn't receive any argument");
            }
            const items = JSON.parse(JSON.stringify(args.itemInputs));

            // check if the menu id received is valid or not
            const menuId = items[0].menu;
            const menu = await Menu.findById(menuId);
            if (!menu) {
                throw new Error("Menu do not exist");
            }

            // add addedOn property to each items
            await items.forEach(item => {
                item["addedOn"] = new Date();
            });

            // save all the items
            const results = await Item.insertMany(items);

            // add the saved items to menus already existing list of items
            const alreadyExistingItems = await Item.find({
                _id: {
                    $in: menu.items
                }
            });
            menu.items = alreadyExistingItems.concat(results);
            await menu.save();

            console.log('results: ', results);
            

            return [...results];
        } catch (err) {
            throw new Error(err);
        }
    },

    /**
     * Retrieve Items from the database.
     * @param {Item} args
     */
    items: async args => {
        try {
            if(!args){
                throw new Error("Didn't receive any argument");
            }

            // change name to regex type to fetch results with same keyword in it.
            if (typeof args.item.name !== 'undefined') {
                args.item.name = await {
                    $regex: '.*' + args.item.name + '.*',
                    $options: 'i'
                };
            }
            const query = JSON.parse(JSON.stringify(args.item));
            const itemList = await Item.find(query);

            if (!itemList) {
                throw new Error("No Item found");
            }

            return itemList;
        } catch (err) {
            return err;
        }
    }
}