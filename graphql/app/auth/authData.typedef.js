const typeDef = `
type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input LoginInput {
    username: String
    pwd: String!
}

type LoginOutput {
    data: AuthData
    error: String
}
`;

const query = `
extend type RootQuery {
    login(login: LoginInput): LoginOutput
}
`;

const mutation = `
`;

module.exports = {
    typeDef: typeDef,
    query: query,
    mutation: mutation
};