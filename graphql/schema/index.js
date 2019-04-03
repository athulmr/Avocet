const {
  buildSchema
} = require('graphql');
const Owner = require('./types/owner');
const Resturant = require('./types/resturant');
const Staff = require('./types/staff');
const Menu = require('./types/menu');
const Images = require('./types/images');
const Item = require('./types/item');

const typeDefs = Menu.typeDef + Images + Item.typeDef + Owner.typeDef + Resturant.typeDef + Staff;
const inputs = Menu.input + Item.input + Resturant.input + Owner.input;

module.exports = buildSchema(typeDefs + inputs + `

type RootQuery {
  owners(owner: OwnerInput): [Owner!]!
  resturants(resturant: ResturantInput): [Resturant!]!
  menu(menu: MenuInput): [Menu!]!
}

type RootMutation {
    createOwner(ownerInput: OwnerInput): Owner!
    createResturant(resturantInput: ResturantInput): Resturant!
    createMenu(menuInput: MenuInput): Menu!
    createItems(itemInputs: [ItemInput]): [Item!]
}
schema {
    query: RootQuery
    mutation: RootMutation
}


`);