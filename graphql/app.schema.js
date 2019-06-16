const {
  buildSchema
} = require('graphql');
const Owner = require('./app/owner/owner.typedef');
const Restaurant = require('./app/restaurant/restaurant.typedef');
const Staff = require('./app/staff/staff.typedef');
const Menu = require('./app/menu/menu.typedef');
const Images = require('./app/images/images.typedef');
const Item = require('./app/item/item.typedef');

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