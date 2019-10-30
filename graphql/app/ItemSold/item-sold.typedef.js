const typeDef = `
type ItemSold {
    _id: ID!
    restaurant: ID!
    saleOrder: ID!
    name: String!
    code: String!
    qty: Int!
    unitPrice: Int!
    totalCost: Int!
    addedOn: String
}

input ItemSoldInput {
    name: String!
    code: String!
    qty: Int!
    unitPrice: Int!
}
`;

module.exports = {
    typeDef: typeDef
};