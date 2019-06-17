const typeDef = `
type Restaurant {
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

input RestaurantInput {
    name: String!
    address: String!
    phone: String!
    email: String!
    owner: ID!
}
`;

const query = `
extend type RootQuery {
restaurants(restaurant: RestaurantInput): [Restaurant!]!
}
`

const mutation =`
extend type RootMutation {
createRestaurant(restaurantInput: RestaurantInput): Restaurant!
}
`;

module.exports = {
    typeDef: typeDef,
    query: query,
    mutation: mutation
};