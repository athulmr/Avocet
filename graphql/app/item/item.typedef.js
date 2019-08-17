const typeDef = `
type Item {
    _id: ID!
    menu: Menu!
    name: String!
    code: String!
    desc: String
    category: [String!]!
    price: Float!
    imgUrl: [String!]
    count: Int
    addedOn: String
    # Have to add item active indicator
}

type ItemDeleteStatus {
    status: Boolean!
}

input ItemQuery {
    category: ID!
    name: String
    code: String
    desc: String
    price: Float
    imgUrl: [String!]
    count: Int
}

input ItemInput {
    category: ID!
    name: String!
    code: String!
    price: Float!
    desc: String
    imgUrl: [String!]
    count: Int
}

type ItemOut {
    data: [Item]
    error: String
}
`;

const query = `
extend type RootQuery {
    items(item: ItemQuery): [Item!]!
}
`;

const mutation = `
extend type RootMutation {
    createItem(itemInput: ItemInput): ItemOut!
    deleteItem(id: String): ItemDeleteStatus!
}
`

module.exports = {
    typeDef: typeDef,
    query: query,
    mutation: mutation
};