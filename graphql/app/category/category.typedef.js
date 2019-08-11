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

type CategoryOut {
    data: [Category]
    error: String
}
`;

const query =`
extend type RootQuery {
categories(category: CategoryQuery): CategoryOut!
}
`;

const mutation = `
extend type RootMutation {
createCategory(categoryInput: CategoryInput): CategoryOut!
}
`;

module.exports = {
    typeDef: typeDef,
    query: query,
    mutation: mutation
}