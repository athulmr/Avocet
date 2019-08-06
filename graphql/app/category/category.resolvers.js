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
            const menu = await Menu.findById(categoryInput.menu).catch(err => {throw new Error("Menu do not exist",err)});

            categoryInput["addedOn"] = new Date();
            categoryInput["active"] = true;
            categoryInput.menu = menu;

            const category = new Category(categoryInput);
            const savedCategory = await category.save().catch(err => {throw new Error("Error while saving category",err)});

            // add the saved item to menus already existing list of items
            menu.categories.push(savedCategory);
            await menu.save().catch(err => {throw new Error("Error while updating Menu",err)});;

            console.log('result: ', savedCategory);

            return savedCategory;

        } catch (err) {
            return err;
        }

    },
    categories: async args => {
        try{
            console.log(args.category);
            const menu = await Menu.findById(args.category.menu).catch(err => {throw new Error("Menu do not exist!")});

            const query = JSON.parse(JSON.stringify(args.category));
            console.log(query);
            const categoryList = await Category.find(query).catch(err => {throw new Error("No Category found")});
            console.log(categoryList);

            return categoryList;
        } catch(err){
            return err;
        }
    }
}