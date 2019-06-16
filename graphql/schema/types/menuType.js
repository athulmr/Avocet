const typeDef = `
type Menu {
    _id: ID!
    restaurant: Restaurant!
    name: String!
    categories: [String!]!
    item: [Item!]
}
`;

const input = `
input MenuInput {
    restaurant: ID!
    name: String!
    categories: [String!]!
    item: [ID!]
}
`;

const query = `
input MenuQuery {
    restaurant: ID
    _id: ID
    name: String
}
`;

module.exports = {
    typeDef: typeDef,
    input: input,
    query: query
}