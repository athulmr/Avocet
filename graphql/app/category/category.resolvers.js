const Menu = require('../menu/menu');
const Category = require('./category');

module.exports = {
    /**
     * Creates a Menu which will hold a list of Items for a Restaurant.
     * @param {categoryInput} args contains Details for creating menu and Restaurant ID.
     */
    createCategory: async args => {
        try {
            const categoryInput = args.categoryInput;
            const menu = await Menu.findById(categoryInput.menu);

            if(!menu){
                throw new Error("Menu do not exist!");
            }

            categoryInput["addedOn"] = new Date();
            categoryInput["active"] = true;
            categoryInput.menu = menu;

            const category = new Category(categoryInput);
            const savedCategory = await category.save();

            // add the saved item to menus already existing list of items
            const alreadyExistingCategories = await Category.find({
                _id: {
                    $in: menu.categories
                }
            });
            menu.categories = alreadyExistingCategories.concat(savedCategory);
            await menu.save();

            console.log('result: ', savedCategory);

            return savedCategory;

        } catch (err) {
            return err;
        }

    },
    categories: async args => {
        try{
            console.log(args.category);
            const menu = await Menu.findById(args.category.menu);

            if(!menu){
                throw new Error("Menu do not exist!");
            }
            const query = JSON.parse(JSON.stringify(args.category));
            console.log(query);
            const categoryList = await Category.find(query);
            console.log(categoryList);

            if(!categoryList) {
                throw new Error("No Category found");
            }

            return categoryList;
        } catch(err){
            return err;
        }
    }
}