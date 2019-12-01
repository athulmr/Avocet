const typeDef = `
type cart {
    _id: ID!
    restaurant: ID!
    soldItems: [SoldItem!]
    delivery: Delivery
    value: Float
    addedOn: String
}

input CartInput {
    restaurant: ID!
    startDate: String
    endDate: String
    discount: Float
    delivery: DeliveryInput
    soldItems: [SoldItemInput!]
    pageInfo: PageInfo  
}

input CartHistoryInput {
    restaurantCodes: [String]
    startDate: String
    endDate: String
    pageInfo: PageInfo  
}

input PageInfo {
    limit: Float
    offset: Float
}

type PageInfoOutput {
    limit: Float
    offset: Float
    total: Float
}

type CartOutput {
    data: [cart]
    pageInfo: PageInfoOutput
}
`;

const query = `
extend type RootQuery {
carts(cart: CartHistoryInput): CartOutput
}
`

const mutation =`
extend type RootMutation {
saveCart(cart: CartInput): CartOutput 
}
`;

module.exports = {
    typeDef,
    query,
    mutation
};