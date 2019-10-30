const typeDef = `
type SaleOrder {
    _id: ID!
    restaurant: ID!
    itemsSold: [ItemSold!]
    addedOn: String
}

input SaleOrderInput {
    restaurant: ID!
    itemsSold: [ItemSoldInput!]
}

type SaleOrderOutput {
    data: [SaleOrder]
    error: String
}
`;

const query = `
extend type RootQuery {
saleOrders(saleOrder: SaleOrderInput): [RestaurantOutput!]
}
`

const mutation =`
extend type RootMutation {
createSaleOrder(saleOrder: SaleOrderInput): SaleOrderOutput 
}
`;

module.exports = {
    typeDef,
    query,
    mutation
};