const typeDef = `
type Resturant {
    _id: ID!
    name: String!
    address: String!
    phone: [String!]
    email: [String!]
    owners: Owner!
    staffs: [Staff!]
    menu: [Menu!]
    img: Images
}
`;

const input = `
input ResturantInput {
    name: String!
    address: String!
    phone: String!
    email: String!
    ownerEmail: String!
}
`;

module.exports = {
    typeDef: typeDef,
    input: input
};