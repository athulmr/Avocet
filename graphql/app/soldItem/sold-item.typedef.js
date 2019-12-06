const typeDef = `
type SoldItem {
    _id: ID!
    restaurant: ID!
    cart: ID!
    name: String!
    code: String!
    qty: Int!
    unitPrice: Float!
    unitPkgChrg: Float!
    totalCost: Float!
    addedOn: String
}

input SoldItemInput {
    name: String!
    code: String!
    qty: Int!
    unitPrice: Float!
    unitPkgChrg: Float!
}
`;

module.exports = {
    typeDef: typeDef
};