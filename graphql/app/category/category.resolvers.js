const Menu = require('../../../model/Menu');
const Category = require('../../../model/Category');

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
            const query = JSON.parse(JSON.stringify(args.category));
            console.log(query);
            const restaurants = await Category.find(query)
                .populate('items')
                .then(data => {
                    // console.log( data);
                    return {
                        data: data
                    };
                }).catch(err => {
                    console.log(JSON.stringify(err));

                    return {
                        error: err
                    }
                });

            return restaurants;
        } catch (err) {
            throw err;
        }
    }
}