const Resturant = require('../../model/resturant');
const Owner = require('../../model/owner');

module.exports = {
    createResturant: async args => {
        try {
            const owner = await Owner.findOne({email: args.resturantInput.ownerEmail});

            if (!owner) {
                throw new Error("Owner Email Doesnt Exist");
            }

            const existingResturant = await Resturant.findOne({email: args.resturantInput.email});

// have to add phone number for finding resturant(some resturants maynot have email)
            
            args.resturantInput["owners"] = [];
            args.resturantInput.owners.push(owner);
            const resturant = new Resturant(args.resturantInput);

            const result = await resturant.save();
            owner.resturants.push(result);
            await owner.save();
            return { ...result._doc, _id: result.id };
            
        } catch(err) {
            throw err;
        }
    },
    resturants: async args => {
        try{
            console.log(args.resturant);
            const query = JSON.parse(JSON.stringify(args.resturant));
            console.log(query);
            const resturants = await Owner.find(query);

            if(!resturants) {
                throw new Error("No Owner found");
            }

            return resturants;
        } catch(err){
            throw err;
        }
    }
}