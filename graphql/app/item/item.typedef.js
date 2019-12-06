const typeDef = `
type Item {
    _id: ID!
    menu: Menu!
    name: String!
    code: String!
    desc: String
    category: [String!]!
    price: Float!
    pkgChrg: Float
    imgUrl: [String!]
    count: Int
    addedOn: String
    # Have to add item active indicator
}

type ItemDeleteStatus {
    status: Boolean!
}

input ItemQuery {
    category: ID
    restaurant: ID
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
    pkgChrg: Float!
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
    createItem(itemInput: ItemInput): Item!
    deleteItem(id: String): ItemDeleteStatus!
}
`

module.exports = {
    typeDef: typeDef,
    query: query,
    mutation: mutation
};