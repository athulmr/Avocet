const bcrypt = require('bcrypt');

const Staff = require('../../model/staff');
const Restaurant  = require('../../model/restaurant');

module.exports = {
    /**
     * Creates an account for the Staff.
     * Tag the Staff with Restaurant and add Staff to Restaurant's Staffs List 
     * @param {StaffInput} args Contains details about staff and Restaurant ID
     */
    createStaff: async args => {
        try {
            console.log(args);
            const staffInput = args.staffInput;
            const restaurant = await Restaurant.findById(staffInput.restaurant);
            if(!restaurant){
                throw new Error("Restaurant not found");
            }

            staffInput.restaurant = restaurant;
            staffInput["approved"] = false;
            staffInput["addedOn"] = new Date();
            staffInput.pwd = await bcrypt.hash(staffInput.pwd, 12);

            const staff = new Staff(staffInput);
            const result = await staff.save();

            restaurant.staffs.push(result);

            await restaurant.save();
            
            return { ...result._doc, pwd: null, _id: result.id };
        } catch(err) {
            return err;
        }
    },
}