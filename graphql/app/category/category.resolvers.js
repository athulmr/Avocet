const Menu = require('../menu/menu');
const Category = require('./category');

module.exports = {
    /**
     * Creates a Category which will hold a list of Items.
     * @param {categoryInput} args contains Details for creating category and Menu ID.
     */
    createCategory: async args => {
        try {
            const categoryInput = args.categoryInput;
            const result = await Menu.findById(categoryInput.menu)
                .then(menu => {
                    categoryInput["addedOn"] = new Date();
                    categoryInput["active"] = true;
                    categoryInput.menu = menu;

                    const category = new Category(categoryInput);
                    return category.save()
                    .then( data => {
                        // add the saved category to menus already existing categories
                        menu.categories.push(data);
                        menu.save();
                        return { data: [data] }
                    });
                })
                .catch(err => {
                    console.log("Menu do not exist!")
                    return { error : err.message }
                });

            return result;

        } catch (err) {
            console.log(err.message);
            
            return err;
        }

    },
    categories: async args => {
        try {
            console.log(args.category);
            const menu = await Menu.findById(args.category.menu).catch(err => {
                throw new Error("Menu do not exist!")
            });

            const query = JSON.parse(JSON.stringify(args.category));
            console.log(query);
            const categoryList = await Category.find(query).catch(err => {
                throw new Error("No Category found")
            });
            console.log(categoryList);

            return categoryList;
        } catch (err) {
            return err;
        }
    }
}