const Menu = require('../../model/menu');
const Item = require('../../model/item');

module.exports = {
    createItems: async args => {
        try {
            const items = JSON.parse(JSON.stringify(args.itemInputs));
            const menuId = items[0].menu;
            const menu = await Menu.findById(menuId);
            if(!menu){
                throw new Error("Menu do not exist");
            }
            const results = await Item.insertMany(items);
            menu.items = results;
            console.log(results);
            await menu.save();
            return [...results];
        } catch (err) {

        }
    }
}