const typeDef = `
type Owner {
    _id: ID!
    resturants: [Resturant!]
    name: String!
    address: String!
    phone: String!
    email: String!
    dob: String
    sex: String!
}
`;

const input = `
input OwnerInput {
    name: String
    address: String
    phone: String
    email: String
    pwd: String
    dob: String
    sex: String
}
`;

module.exports = {
    typeDef: typeDef,
    input: input
};