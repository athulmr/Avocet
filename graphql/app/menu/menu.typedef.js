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

const queryInput = `
input MenuQuery {
    restaurant: ID
    _id: ID
    name: String
}
`;

const query =`
menu(menu: MenuQuery): [Menu!]!
`;

module.exports = {
    typeDef: typeDef,
    input: input,
    queryInput: queryInput,
    query: query
}