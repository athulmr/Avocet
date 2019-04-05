const {
  buildSchema
} = require('graphql');
const Owner = require('./types/owner');
const Restaurant = require('./types/restaurant');
const Staff = require('./types/staff');
const Menu = require('./types/menu');
const Images = require('./types/images');
const Item = require('./types/item');

const typeDefs = Menu.typeDef + Images + Item.typeDef + Owner.typeDef + Restaurant.typeDef + Staff.typeDef;
const inputs = Menu.input + Item.input + Restaurant.input + Owner.input + Staff.input;

module.exports = buildSchema(typeDefs + inputs + `

type RootQuery {
  owners(owner: OwnerInput): [Owner!]!
  restaurants(restaurant: RestaurantInput): [Restaurant!]!
  menu(menu: MenuInput): [Menu!]!
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