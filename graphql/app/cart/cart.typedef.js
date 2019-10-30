const typeDef = `
type cart {
    _id: ID!
    restaurant: ID!
    itemsSold: [ItemSold!]
    addedOn: String
}

input CartInput {
    restaurant: ID!
    itemsSold: [ItemSoldInput!]
}

type CartOutput {
    data: [cart]
    error: String
}
`;

const query = `
extend type RootQuery {
carts(cart: CartInput): CartOutput
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