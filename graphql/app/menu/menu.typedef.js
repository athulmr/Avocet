const typeDef = `
type Menu {
    _id: ID!
    restaurant: Restaurant!
    name: String!
    categories: [Category!]
}

input MenuInput {
    restaurant: ID!
    name: String!
}

input MenuQuery {
    restaurant: ID!
    _id: ID
    name: String
}

type MenuOut {
    data: [Menu]
    error: String
}
`;

const query =`
extend type RootQuery {
menu(menu: MenuQuery): [Menu!]!
}
`;

const mutation = `
extend type RootMutation {
createMenu(menuInput: MenuInput): MenuOut!
}
`;

module.exports = {
    typeDef: typeDef,
    query: query,
    mutation: mutation
}