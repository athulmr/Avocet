const typeDef = `
type Menu {
    _id: ID!
    restaurant: Restaurant!
    name: String!
    categories: [String!]!
    items: [Item!]
}

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
    query: query,
    mutation: mutation
}