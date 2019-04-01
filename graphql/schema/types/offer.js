const  typeDef = `
type Offer {
    _id: ID!
    resturantId: Resturant!
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