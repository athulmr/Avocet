const typeDef = `
type Menu {
    _id: ID!
    resturantId: Resturant!
    name: String!
    categories: [String!]!
    item: [Item!]
}
`;

const input = `
input MenuInput {
    resturantId: ID!
    name: String!
    categories: [String!]!
    item: [ID!]
}
`;

module.exports = {
    typeDef: typeDef,
    input: input
}