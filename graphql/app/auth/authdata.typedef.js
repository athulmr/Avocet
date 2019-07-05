const typeDef = `
type AuthData {
    userId: ID
    token: String!
    tokenExpiration: Int!
}

input LoginInput {
    userId: ID!
    pwd: String!
}
`;

const query = `
extend type RootQuery {
    login(login: LoginInput): AuthData!
}
`;

const mutation = `
`;

module.exports = {
    typeDef: typeDef,
    query: query,
    mutation: mutation
};