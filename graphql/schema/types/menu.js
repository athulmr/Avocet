const typeDef = `
type Menu {
    _id: ID!
    restaurantId: Restaurant!
    name: String!
    categories: [String!]!
    item: [Item!]
}
`;

const input = `
input MenuInput {
    restaurantId: ID!
    name: String!
    categories: [String!]!
    item: [ID!]
}
`;

module.exports = {
    typeDef: typeDef,
    input: input
}