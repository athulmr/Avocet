const typeDef = `
type Restaurant {
    _id: ID
    name: String!
    code: String!
    address: String!
    phone: [String!]
    email: [String!]
    owners: Owner!
    staffs: [Staff!]
    menu: [Menu!]
    img: Images
}

input RestaurantInput {
    name: String!
    code: String!
    address: String!
    phone: String!
    email: String!
    owner: ID!
}

type RestaurantOutput {
    data: Restaurant
    error: String
}
`;

const query = `
extend type RootQuery {
restaurants(restaurant: RestaurantInput): [Restaurant!]!
}
`

const mutation =`
extend type RootMutation {
createRestaurant(restaurantInput: RestaurantInput): RestaurantOutput
}
`;

module.exports = {
    typeDef: typeDef,
    query: query,
    mutation: mutation
};