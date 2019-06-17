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
`;

const input = `
input ItemInput {
    menu: ID!
    name: String!
    code: String!
    desc: String
    category: [String!]!
    price: Float!
    imgUrl: [String!]
    count: Int
}
`;

const queryInput = `
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
`;

const query = `
items(item: ItemQuery): [Item!]!
`;

const mutation = `
createItems(itemInputs: [ItemInput]): [Item!]
`

module.exports = {
    typeDef: typeDef,
    input: input,
    queryInput: queryInput,
    query: query,
    mutation: mutation
};