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

input MenuQuery {
    restaurant: ID
    _id: ID
    name: String
}
`;

const query =`
extend type RootQuery {
menu(menu: MenuQuery): [Menu!]!
}
`;

const mutation = `
createMenu(menuInput: MenuInput): Menu!
`;

module.exports = {
    typeDef: typeDef,
    input: input,
    query: query,
    mutation: mutation
}