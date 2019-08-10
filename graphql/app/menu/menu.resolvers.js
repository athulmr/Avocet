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
            const result = await Restaurant.findById(menuInput.restaurant)
                .then(restaurant => {
                    menuInput["addedOn"] = new Date();
                    menuInput["active"] = true;
                    menuInput.restaurant = restaurant;

                    const menu = new Menu(menuInput);
                    return menu.save()
                    .then( data => {
                        // add the saved item to menus already existing list of items
                        restaurant.menus.push(data);
                        restaurant.save();
                        return { data: [data] }
                    });
                })
                .catch(err => {
                    console.log("Restaurant do not exist!")
                    return { error : err.message }
                });

            return result;

        } catch (err) {
            console.log(err.message);
            
            return err;
        }

    },
    menu: async args => {
        try {
            // console.log(args.menu);
            const restaurant = await Restaurant.findById(args.menu.restaurant);

            if (!restaurant) {
                throw new Error("Restaurant do not exist!");
            }
            const query = JSON.parse(JSON.stringify(args.menu));
            console.log(query);
            const menuList = await Menu.find(query);
            // console.log(menuList);

            if (!menuList) {
                throw new Error("No Menu found");
            }

            return menuList;
        } catch (err) {
            return err;
        }
    }
}