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

type Contacts {
    address: String!
    phone: String!
    email: String!
}

type Owner {
    _id: ID!
    resturants: [Resturant!]
    name: String!
    contacts: Contacts!
    dob: String
    sex: String!
}

type Staff {
    _id: ID!
    resturants: Resturant!
    name: String!
    contacts: Contacts!
    pwd: String
    dob: String!
    sex: String!
    approved: Boolean!
}

type Customer {
    _id: ID!
    resturants: Resturant!
    name: String!
    contacts: Contacts!
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
    contacts: Contacts!
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



input ContactsInput {
    address: String
    phone: String
    email: String
}

input OwnerInput {
  name: String
  contacts: ContactsInput
  pwd: String
  dob: String
  sex: String
}




type RootQuery {
  owners(owner: OwnerInput): [Owner!]!
}

type RootMutation {
    createOwner(ownerInput: OwnerInput): Owner
}
schema {
    query: RootQuery
    mutation: RootMutation
}


`);