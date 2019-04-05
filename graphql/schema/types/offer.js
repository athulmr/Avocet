const  typeDef = `
type Offer {
    _id: ID!
    restaurantId: Restaurant!
    items: [Item!]
    code: String!
    name: String!
    desc: String!
    imgUrl: String!
    startDate: String!
    endDate: String!
}
`;

module.exports = typeDef;