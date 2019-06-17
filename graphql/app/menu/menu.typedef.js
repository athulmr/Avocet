const typeDef = `
type Menu {
    _id: ID!
    restaurant: Restaurant!
    name: String!
    categories: [String!]!
    items: [Item!]
}
`;

const input = `
input MenuInput {
    restaurant: ID!
    name: String!
    categories: [String!]!
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
    queryInput: query
}