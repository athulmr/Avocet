const typeDef = `
type Staff {
    _id: ID!
    resturants: Resturant!
    name: String!
    address: String!
    phone: String!
    email: String!
    pwd: String
    dob: String!
    sex: String!
    approved: Boolean!
}
`;

module.exports = typeDef;