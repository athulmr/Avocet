const {
  buildSchema
} = require('graphql');
const Owner = require('./owner/owner.typedef');
const Restaurant = require('./restaurant/restaurant.typedef');
const Staff = require('./staff/staff.typedef');
const Menu = require('./menu/menu.typedef');
const Images = require('./images/images.typedef');
const Item = require('./item/item.typedef');

const typeDefs = Menu.typeDef + Images + Item.typeDef + Owner.typeDef + Restaurant.typeDef + Staff.typeDef;
const inputs = Menu.input + Item.input + Restaurant.input + Owner.input + Staff.input;
const queryInputs = Menu.queryInput + Item.queryInput;
const rootQuery = Restaurant.query + Owner.query + Item.query;

module.exports = buildSchema(typeDefs + inputs + queryInputs + `

type RootQuery {`
  +rootQuery+
  `
}

type RootMutation {
    createOwner(ownerInput: OwnerInput): Owner!
    createStaff(staffInput: StaffInput): Staff!
    createRestaurant(restaurantInput: RestaurantInput): Restaurant!
    createMenu(menuInput: MenuInput): Menu!
    createItems(itemInputs: [ItemInput]): [Item!]
}
schema {
    query: RootQuery
    mutation: RootMutation
}


`);