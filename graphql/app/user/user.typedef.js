const typeDef = `
type User {
    _id: ID
    restaurants: [Restaurant!]
    name: String!
    address: String!
    phone: String!
    email: String!
    dob: String
    sex: String!
}

input UserInput {
    name: String
    address: String
    phone: String
    email: String
    pwd: String
    dob: String
    sex: String
}

type UserOutput {
    data: User
    error: String
}
`;

const query = `
extend type RootQuery {
users(user: UserInput): [User!]!
}
`;

const mutation = `
extend type RootMutation {
createUser(userInput: UserInput): UserOutput!
}
`

module.exports = {
    typeDef: typeDef,
    query: query,
    mutation: mutation
};