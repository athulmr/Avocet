const Restaurant = require('../../model/restaurant');
const Menu = require('../../model/menu')

module.exports = {
    createMenu: async args => {
        try {
            const menuInput = args.menuInput;
            console.log(args);
            const restaurant = await Restaurant.findById(menuInput.restaurant, (err, data) => {
                return data;
            });
            if (restaurant.menu) {
                throw new Error("Already have a Menu tagged with this restaurant");
            }
            menuInput["addedOn"] = new Date();
            menuInput.restaurantId = restaurant;
            const menu = new Menu(menuInput);
            const result = await menu.save();
            restaurant.menu = result;
            const updateResturnat = await restaurant.save();
            return {
                ...result._doc,
                _id: result.id
            };

        } catch (err) {
            return err;
        }

    }
}