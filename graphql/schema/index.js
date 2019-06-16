const {
  buildSchema
} = require('graphql');
const Owner = require('./types/ownerType');
const Restaurant = require('./types/restaurantType');
const Staff = require('./types/staffType');
const Menu = require('./types/menuType');
const Images = require('./types/imagesType');
const Item = require('./types/itemType');

const typeDefs = Menu.typeDef + Images + Item.typeDef + Owner.typeDef + Restaurant.typeDef + Staff.typeDef;
const inputs = Menu.input + Item.input + Restaurant.input + Owner.input + Staff.input;
const queries = Menu.query + Item.query;

module.exports = buildSchema(typeDefs + inputs + queries + `

type RootQuery {
  owners(owner: OwnerInput): [Owner!]!
  restaurants(restaurant: RestaurantInput): [Restaurant!]!
  menu(menu: MenuQuery): [Menu!]!
  item(item: ItemQuery): [Item!]!
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