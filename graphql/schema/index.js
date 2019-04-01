const {
    buildSchema
} = require('graphql');
const Owner = require('./types/owner');
const Resturant = require('./types/resturant');
const Staff = require('./types/staff');
const Menu = require('./types/menu');
const Images = require('./types/images');
const Item = require('./types/item');

const typeDef = Menu+Images+Item+Owner+Resturant+Staff;

module.exports = buildSchema(typeDef+`

input OwnerInput {
  name: String
  address: String
  phone: String
  email: String
  pwd: String
  dob: String
  sex: String
}

input ResturantInput {
  name: String!
  address: String!
  phone: String!
  email: String!
  ownerEmail: String!
}


type RootQuery {
  owners(owner: OwnerInput): [Owner!]!
  resturants(resturant: ResturantInput): [Resturant!]!
}

type RootMutation {
    createOwner(ownerInput: OwnerInput): Owner
    createResturant(resturantInput: ResturantInput): Resturant
}
schema {
    query: RootQuery
    mutation: RootMutation
}


`);