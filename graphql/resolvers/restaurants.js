const Restaurant = require('../../model/restaurant');
const Owner = require('../../model/owner');

module.exports = {
    createRestaurant: async args => {
        try {
            const owner = await Owner.findOne({email: args.restaurantInput.ownerEmail});

            if (!owner) {
                throw new Error("Owner Email Doesnt Exist");
            }

            const existingRestaurant = await Restaurant.findOne({email: args.restaurantInput.email});

// have to add phone number for finding restaurant(some restaurants maynot have email)
            
            args.restaurantInput["owners"] = [];
            args.restaurantInput.owners.push(owner);
            const restaurant = new Restaurant(args.restaurantInput);

            const result = await restaurant.save();
            owner.restaurants.push(result);
            await owner.save();
            return { ...result._doc, _id: result.id };
            
        } catch(err) {
            throw err;
        }
    },
    restaurants: async args => {
        try{
            console.log(args.restaurant);
            const query = JSON.parse(JSON.stringify(args.restaurant));
            console.log(query);
            const restaurants = await Owner.find(query);

            if(!restaurants) {
                throw new Error("No Owner found");
            }

            return restaurants;
        } catch(err){
            throw err;
        }
    }
}