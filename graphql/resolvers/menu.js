const Resturant = require('../../model/resturant');
const Menu = require('../../model/menu')

module.exports = {
    createMenu: async args => {
        try {
            const menuInput = args.menuInput;
            console.log(args);
            const resturant = await Resturant.findById(args.menuInput.resturantId, (err, data) => {
                return data;
            });
            if (resturant.menu) {
                throw new Error("Already have a Menu tagged with this resturant");
            }
            menuInput.resturantId = resturant;
            const menu = new Menu(menuInput);
            const result = await menu.save();
            resturant.menu = result;
            const updateResturnat = await resturant.save();
            return {
                ...result._doc,
                _id: result.id
            };

        } catch (err) {
            return err;
        }

    }
}