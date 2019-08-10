const bcrypt = require('bcryptjs');

const Owner = require('./Owner');

module.exports = {
    /**
     * Creates an account for the Restaurant Owner/Manager.
     * @param {OwnerInput} args contains details for creating account.
     */
    createOwner: async args => {
        try {
            if (!args) {
                throw new Error("Didn't receive any argument");
            }
            console.log(args);
            const ownerInput = args.ownerInput;

            ownerInput["addedOn"] = new Date();
            ownerInput.pwd = await bcrypt.hash(ownerInput.pwd, 12);

            const owner = new Owner(ownerInput);

            return await owner.save()
            .then( data => {
                return { data: data };
            })
            .catch( err => {
                console.log("Error while saving Owner : ",err.message);
                return { error: err.message };
            });
            
        } catch(err) {
            console.log(err);
            return err;
        }
    },
    /**
     * Returns the Restaurant Owner/Manger based on the search criteria.
     * @param {Owner} args contains search criteria.
     */
    owners: async args => {
        try{
            // console.log(args.owner);
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