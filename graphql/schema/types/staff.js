const typeDef = `
type Staff {
    _id: ID!
    restaurant: Restaurant!
    name: String!
    address: String
    phone: String!
    email: String!
    pwd: String
    dob: String
    sex: String
    approved: Boolean!
}
`;

const input = `
input StaffInput {
    restaurant: ID!
    name: String!
    address: String
    phone: String!
    email: String!
    pwd: String
    dob: String
    sex: String
}
`

module.exports = {
    typeDef: typeDef,
    input: input
}