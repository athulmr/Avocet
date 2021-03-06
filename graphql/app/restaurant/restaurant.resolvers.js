const Restaurant = require('../../../model/Restaurant');
const User = require('../../../model/User');

module.exports = {
    /**
     * Creates a new Restaurant for Owner/Manager.
     * Tag the Restaurant with Owner and adds the Restaurant to Owners Restaurants List.
     * @param {RestaurantInput} args contains all the necessary details for creating the Restaurant. 
     */
    createRestaurant: async (args, context) => {
        try {
            if (!args) throw new Error("Args are empty, check if you are passing 'variables' or not")
            const restaurantInput = args.restaurantInput;

            restaurantInput.owner = context.user._id;            
            
            const result = await User.findById(restaurantInput.owner)
                .then(user => {
                    if (!user) throw new Error('User not found');
                    
                    // have to add phone number for finding restaurant(some restaurants may not have email)
                    restaurantInput["owners"] = [];
                    restaurantInput.owners.push(user);
                    restaurantInput["addedOn"] = new Date();
                    const restaurant = new Restaurant(restaurantInput);

                    return restaurant.save()
                        .then(data => {
                            // Add new restaurant to Owner's restaurant list.               
                            user.restaurants.push(data);
                            user.save();
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
    updateRestaurant: async (args, context) => {
        try {
            if (!args) throw new Error("Args are empty, check if you are passing 'variables' or not")
            const restaurantInput = args.restaurantInput;            

            restaurantInput.owner = context.user._id;            
            
            return User.findById(restaurantInput.owner)
                .then(user => {
                    if (!user) throw new Error('User not found');
                    
                 return Restaurant.findById(restaurantInput._id)
                .then(restaurant => {
                    restaurant.name = restaurantInput.name;
                    restaurant.email = restaurantInput.email;
                    restaurant.address = restaurantInput.address;
                    restaurant.active = restaurantInput.active;
                    restaurant.phone = restaurantInput.phone;
                    return restaurant.save()
                    .then(restaurant => {
                        return restaurant;
                    })
                }).catch(err => {
                    throw new Error(err);
                });

                })
                .catch(err => {
                    console.log("Owner do not Exist");
                    return {
                        error: err.message
                    };
                });

        } catch (err) {
            throw err;
        }
    },
    restaurants: async (args, context) => {
        try {
            // Context will hold all the request context
            // console.log(args.restaurant, '\n context',context.user._id);
            args.restaurant.owners = context.user._id;
            const query = JSON.parse(JSON.stringify(args.restaurant));
            console.log(query);
            const restaurants = await Restaurant.find(query)
                .populate('config')
                .populate('menus')
                .then(restaurants => {
                    restaurants.forEach(restaurant => {
                        console.log('config',restaurant.config);
                        console.log('menus',restaurant.menus);
                        
                    })
                    return {
                        data: restaurants
                    };
                }).catch(err => {
                    console.log('nope');

                    return {
                        error: err
                    }
                });

            return restaurants;
        } catch (err) {
            throw {
                error: err
            }
        }
    }
}