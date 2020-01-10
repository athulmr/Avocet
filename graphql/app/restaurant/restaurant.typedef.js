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
    config: Config
}

input RestaurantInput {
    name: String!
    code: String!
    address: String
    phone: String
    email: String
    owner: ID
}

input RestaurantUpdateInput {
    _id: ID!
    name: String!
    code: String!
    address: String
    phone: [String]
    email: [String]
    owners: [ID]
}

input RestaurantQuery {
    _id: ID
    name: String
    code: String
    address: String
    phone: [String]
    email: [String]
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
updateRestaurant(restaurantInput: RestaurantUpdateInput): Restaurant
}
`;

module.exports = {
    typeDef: typeDef,
    query: query,
    mutation: mutation
};