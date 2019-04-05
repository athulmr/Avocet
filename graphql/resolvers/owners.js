const bcrypt = require('bcrypt');

const Owner = require('../../model/owner');

module.exports = {
    createOwner: async args => {
        try {
            console.log(args);
            const ownerInput = args.ownerInput;

            ownerInput.pwd = await bcrypt.hash(ownerInput.pwd, 12);
            ownerInput["addedOn"] = new Date();

            const owner = new Owner(ownerInput);

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