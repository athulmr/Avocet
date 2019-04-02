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
}
`;

const input = `
type ItemInput {
    menu: Menu!
    name: String!
    code: String
    desc: String!
    category: [String!]!
    price: Float!
    imgUrl: [String!]
    count: Int
}
`;

module.exports = {
    typeDef: typeDef,
    input: input
};