const typeDef = `
type Category {
    _id: ID!
    menu: Menu!
    name: String!
    items: [Item!]
    active: Boolean!
}

input CategoryInput {
    menu: ID!
    name: String!
}

input CategoryQuery {
    menu: ID!
    _id: ID
    name: String
}
`;

const query =`
extend type RootQuery {
categories(category: CategoryQuery): [Category!]!
}
`;

const mutation = `
extend type RootMutation {
createCategory(categoryInput: CategoryInput): Category!
}
`;

module.exports = {
    typeDef: typeDef,
    query: query,
    mutation: mutation
}