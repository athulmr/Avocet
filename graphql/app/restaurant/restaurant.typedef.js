const typeDef = `
type Restaurant {
    _id: ID
    name: String!
    code: String!
    address: String
    phone: [String]
    email: [String]
    owners: User!
    menus: [Menu!]
}

input RestaurantInput {
    name: String!
    code: String!
    address: String
    phone: String
    email: String
    owner: ID
}

input RestaurantQuery {
    _id: ID
    name: String
    code: String
    address: String
    phone: String
    email: String
    owners: [ID!]
}

type RestaurantOutput {
    data: [Restaurant]
    error: String
}
`;

const query = `
extend type RootQuery {
restaurants(restaurant: RestaurantQuery): RestaurantOutput!
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