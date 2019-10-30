const typeDef = `
type SoldItem {
    _id: ID!
    restaurant: ID!
    cart: ID!
    name: String!
    code: String!
    qty: Int!
    unitPrice: Int!
    totalCost: Int!
    addedOn: String
}

input SoldItemInput {
    name: String!
    code: String!
    qty: Int!
    unitPrice: Int!
}
`;

module.exports = {
    typeDef: typeDef
};