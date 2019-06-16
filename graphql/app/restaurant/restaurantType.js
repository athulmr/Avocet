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
`;

const input = `
input RestaurantInput {
    name: String!
    address: String!
    phone: String!
    email: String!
    owner: ID!
}
`;

module.exports = {
    typeDef: typeDef,
    input: input
};