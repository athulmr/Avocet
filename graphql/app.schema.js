const {
  buildSchema
} = require('graphql');
const Owner = require('./app/owner/ownerType');
const Restaurant = require('./app/restaurant/restaurantType');
const Staff = require('./app/staff/staffType');
const Menu = require('./app/menu/menuType');
const Images = require('./app/images/imagesType');
const Item = require('./app/item/itemType');

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