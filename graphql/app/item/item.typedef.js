const typeDef = `
type Item {
    _id: ID!
    menu: Menu!
    name: String!
    code: String!
    desc: String!
    category: [String!]!
    price: Float!
    imgUrl: [String!]
    count: Int
    addedOn: String
    # Have to add item active indicator
}

input ItemQuery {
    menu: ID!
    name: String
    code: String
    desc: String
    category: [String!]
    price: Float
    imgUrl: [String!]
    count: Int
}

input ItemInput {
    menu: ID!
    name: String!
    code: String!
    category: [String!]
    price: Float!
    desc: String
    imgUrl: [String!]
    count: Int
}
`;

const query = `
extend type RootQuery {
    items(item: ItemQuery): [Item!]!
}
`;

const mutation = `
extend type RootMutation {
    createItems(itemInputs: [ItemInput]): [Item!]
}
`

module.exports = {
    typeDef: typeDef,
    query: query,
    mutation: mutation
};