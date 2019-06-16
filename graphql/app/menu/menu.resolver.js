const Restaurant = require('../restaurant/Restaurant');
const Menu = require('./Menu')

module.exports = {
    /**
     * Creates a Menu which will hold a list of Items for a Restaurant.
     * @param {MenuInput} args contains Details for creating menu and Restaurant ID.
     */
    createMenu: async args => {
        try {
            const menuInput = args.menuInput;
            const restaurant = await Restaurant.findById(menuInput.restaurant);

            if(!restaurant){
                throw new Error("Restaurant do not exist!");
            }
            if (restaurant.menu) {
                throw new Error("Already have a Menu tagged with this restaurant");
            }

            menuInput["addedOn"] = new Date();
            menuInput.restaurant = restaurant;

            const menu = new Menu(menuInput);
            const result = await menu.save();
            restaurant.menu = result;

            await restaurant.save();
            return {
                ...result._doc,
                _id: result.id
            };

        } catch (err) {
            return err;
        }

    }
}