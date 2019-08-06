const Restaurant = require('../restaurant/Restaurant');
const Menu = require('./menu')

module.exports = {
    /**
     * Creates a Menu which will hold a list of Items for a Restaurant.
     * @param {MenuInput} args contains Details for creating menu and Restaurant ID.
     */
    createMenu: async args => {
        try {
            const menuInput = args.menuInput;
            const restaurant = await Restaurant.findById(menuInput.restaurant).catch(err => {throw new Error("Restaurant do not exist!")});

            menuInput["addedOn"] = new Date();
            menuInput.restaurant = restaurant;

            const menu = new Menu(menuInput);
            const savedMenu = await menu.save();
            // add the saved item to menus already existing list of items
            restaurant.menus.push(savedMenu);
            await restaurant.save();

            return {
                ...savedMenu._doc,
                _id: savedMenu.id
            };

        } catch (err) {
            return err;
        }

    },
    menu: async args => {
        try{
            console.log(args.menu);
            const restaurant = await Restaurant.findById(args.menu.restaurant);

            if(!restaurant){
                throw new Error("Restaurant do not exist!");
            }
            const query = JSON.parse(JSON.stringify(args.menu));
            console.log(query);
            const menuList = await Menu.find(query);
            console.log(menuList);

            if(!menuList) {
                throw new Error("No Menu found");
            }

            return menuList;
        } catch(err){
            return err;
        }
    }
}