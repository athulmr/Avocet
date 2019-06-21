const Menu = require('../menu/Menu');
const Item = require('./Item');

module.exports = {
    /**
     * Creates Items and Add them to Menu's items List.
     * @param {ItemInput} args Contains details about item and menuId.
     */
    createItems: async args => {
        try {
            console.log("createItem Resolver",args);
            const items = JSON.parse(JSON.stringify(args.itemInputs));
            const menuId = items[0].menu;
            console.log("createItem Resolver Finding Menu");
            const menu = await Menu.findById(menuId);
            console.log("createItem Resolver Found Menu", menu.name);
            
            if(!menu){
                throw new Error("Menu do not exist");
            }
            
            console.log("createItem Resolver adding addedOn");
            await items.forEach(item => {
                item["addedOn"] = new Date();                
                });
                console.log("createItem Resolver added [0]addedOn", items[0].addedOn);

                
                //const item = new Item(items);
                const results = await Item.insertMany(items);
                console.log('Item Saved');
                const alreadyExistingItems = await Item.find({_id: {$in: menu.items}});
                console.log('Found already Existing');
            
            menu.items = alreadyExistingItems.concat(results);
            await menu.save();
            
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
        try{
            console.log('Item',args);
            console.log('Item',args.item);
            //console.log('Item Name',new RegExp(args.item.name, "i"));
            if(typeof args.item.name !== 'undefined') {
                args.item.name = await { $regex: '.*' + args.item.name + '.*', $options: 'i' };  
            } 
            const query = JSON.parse(JSON.stringify(args.item));
            console.log(query);
            const itemList = await Item.find(query);

            if(!itemList) {
                throw new Error("No Item found");
            }

            return itemList;
        } catch(err){
            return err;
        }
    }
}