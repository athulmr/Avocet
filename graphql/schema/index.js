const {
    buildSchema
} = require('graphql');

module.exports = buildSchema(`
type Item {
    _id: ID!
    menu: Menu!
    name: String!
    code: String!
    desc: String!
    category: [String!]!
    price: Float!
    imgUrl: [String!]
    count: Int
}

type Menu {
    _id: ID!
    resturantId: Resturant!
    name: String!
    item: [Item!]
}

type Offer {
    _id: ID!
    resturantId: Resturant!
    items: [Item!]
    code: String!
    name: String!
    desc: String!
    imgUrl: String!
    startDate: String!
    endDate: String!
}

type Owner {
    _id: ID!
    resturants: [Resturant!]
    name: String!
    address: String!
    phone: String!
    email: String!
    dob: String
    sex: String!
}

type Staff {
    _id: ID!
    resturants: Resturant!
    name: String!
    address: String!
    phone: String!
    email: String!
    pwd: String
    dob: String!
    sex: String!
    approved: Boolean!
}

type Customer {
    _id: ID!
    resturants: Resturant!
    name: String!
    address: String!
    phone: String!
    email: String!
    pwd: String
    dob: String!
    sex: String!
    approved: Boolean!
}

type Images {
    logo: String!
    banner: String!
    background: String!
}

type Resturant {
    _id: ID!
    name: String!
    address: String!
    phone: [String!]
    email: [String!]
    owners: Owner!
    staffs: [Staff!]
    menu: [Menu!]
    img: Images
}

type BookingStatus {
    sDate: String!
    eDate: String!
    customer: Customer!
}

type Table {
    resturantId: Resturant!
    code: String!
    capacity: Int!
    occupied: Boolean!
    bookingStatus: [BookingStatus!]
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}



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