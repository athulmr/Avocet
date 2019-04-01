const typeDef = `
type Menu {
    _id: ID!
    resturantId: Resturant!
    name: String!
    item: [Item!]
}
`;

module.exports = typeDef;