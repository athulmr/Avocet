const Restaurant = require('./Restaurant');
const Owner = require('../owner/Owner');

module.exports = {
    /**
     * Creates a new Restaurant for Owner/Manager.
     * Tag the Restaurant with Owner and adds the Restaurant to Owners Restaurants List.
     * @param {RestaurantInput} args contains all the necessary details for creating the Restaurant. 
     */
    createRestaurant: async args => {
        try {
            if (!args) throw new Error("Args are empty, check if you are passing 'variables' or not")
            const restaurantInput = args.restaurantInput;
            
            const result = await Owner.findById(restaurantInput.owner)
                .then(owner => {
                    if (!owner) throw new Error('Owner not found');
                    
                    // have to add phone number for finding restaurant(some restaurants may not have email)
                    restaurantInput["owners"] = [];
                    restaurantInput.owners.push(owner);
                    restaurantInput["addedOn"] = new Date();
                    const restaurant = new Restaurant(restaurantInput);

                    return restaurant.save()
                        .then(data => {
                            // Add new restaurant to Owner's restaurant list.               
                            owner.restaurants.push(data);
                            owner.save();
                            return {
                                data: [data]
                            };
                        })
                        .catch(err => {
                            console.log("createRestaurant Unable to save New Restaurant to DB", err.message);
                            return {
                                error: err.message
                            };
                        });
                })
                .catch(err => {
                    console.log("Owner do not Exist");
                    return {
                        error: err.message
                    };
                });


            return result;

        } catch (err) {
            throw err;
        }
    },
    restaurants: async args => {
        try {
            console.log(args.restaurant);
            const query = JSON.parse(JSON.stringify(args.restaurant));
            console.log(query);
            const restaurants = await Restaurant.find(query)
                .populate('menus')
                .then(data => {
                    console.log('yep', data);

                    return {
                        data: data
                    };
                }).catch(err => {
                    console.log('nope');

                    return {
                        error: err
                    }
                    throw new Error("No Restaurant found");
                });

            return restaurants;
        } catch (err) {
            throw err;
        }
    }
}