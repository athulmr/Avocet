const bcrypt = require('bcrypt');

const Owner = require('../../model/owner');

module.exports = {
    createOwner: async args => {
        try {
            console.log(args);
            const existingOwner = await Owner.find({email: args.ownerInput.email});

            if (existingOwner) {
                throw new Error("User alredy Exist"); 
            }

            args.ownerInput.pwd = await bcrypt.hash(args.ownerInput.pwd, 12);
            const owner = new Owner(args.ownerInput);

            const result = await owner.save();
            
            return { ...result._doc, pwd: null, _id: result.id };
        } catch(err) {
            return err;
        }
    },
    owners: async args => {
        try{
            console.log(args.owner);
            const query = JSON.parse(JSON.stringify(args.owner));
            console.log(query);
            const ownersList = await Owner.find(query);

            if(!ownersList) {
                throw new Error("No Owner found");
            }

            return ownersList;
        } catch(err){
            return err;
        }
    }
}