const typeDef = `
type SaleOrder {
    _id: ID!
    restaurant: ID!
    itemsSold: [ItemSold!]
    addedOn: String
}

input SaleOrderInput {
    _id: ID!
    restaurant: ID!
    itemsSold: [ItemSoldInput!]
    addedOn: String
}
`;

const query = `
extend type RootQuery {
saleOrders(saleOrder: SaleOrderInput): [RestaurantOutput!]
}
`

const mutation =`
extend type RootMutation {
createSaleOrder(saleOrder: SaleOrderInput): SaleOrder 
}
`;

module.exports = {
    typeDef,
    query,
    mutation
};