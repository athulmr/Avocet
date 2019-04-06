const Menu = require('../../model/menu');
const Item = require('../../model/item');

module.exports = {
    /**
     * Creates Items and Add them to Menu's items List.
     * @param {ItemInput} args Contains details about item and menuId.
     */
    createItems: async args => {
        try {
            const items = JSON.parse(JSON.stringify(args.itemInputs));
            const menuId = items[0].menu;
            const menu = await Menu.findById(menuId);

            if(!menu){
                throw new Error("Menu do not exist");
            }

            await items.forEach(item => {
                item["addedOn"] = new Date();                
            });

            console.log(items);

            const results = await Item.insertMany(items);
            const alreadyExistingItems = await Item.find({_id: {$in: menu.items}});
            
            menu.items = alreadyExistingItems.concat(results);
            await menu.save();
            
            return [...results];
        } catch (err) {
            throw new Error(err);
        }
    }
}