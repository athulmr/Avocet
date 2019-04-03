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
            const result = await Item.insertMany(items);
            menu.items = result;
            await menu.save();
            return {
                ...result._doc,
                _id: result.id
            };;
        } catch (err) {

        }
    }
}