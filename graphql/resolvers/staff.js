const bcrypt = require('bcrypt');

const Staff = require('../../model/staff');
const Restaurant  = require('../../model/restaurant');

module.exports = {
    createStaff: async args => {
        try {
            console.log(args);
            const existingStaff = await Staff.find({email: args.staffInput.email});

            if (existingStaff) {
                throw new Error("User alredy Exist"); 
            }


            args.staffInput.pwd = await bcrypt.hash(args.staffInput.pwd, 12);
            const staff = new Staff(args.staffInput);

            const result = await staff.save();
            
            return { ...result._doc, pwd: null, _id: result.id };
        } catch(err) {
            return err;
        }
    },
    staffs: async args => {
        try{
            console.log(args.staff);
            const query = JSON.parse(JSON.stringify(args.staff));
            console.log(query);
            const ownersList = await Staff.find(query);

            if(!ownersList) {
                throw new Error("No Owner found");
            }

            return ownersList;
        } catch(err){
            return err;
        }
    }
}