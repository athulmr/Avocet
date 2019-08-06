const typeDef = `
type Owner {
    _id: ID
    restaurants: [Restaurant!]
    name: String!
    address: String!
    phone: String!
    email: String!
    dob: String
    sex: String!
}

input OwnerInput {
    name: String
    address: String
    phone: String
    email: String
    pwd: String
    dob: String
    sex: String
}

type OwnerOutput {
    data: Owner
    error: String
}
`;

const query = `
extend type RootQuery {
owners(owner: OwnerInput): [Owner!]!
}
`;

const mutation = `
extend type RootMutation {
createOwner(ownerInput: OwnerInput): OwnerOutput!
}
`

module.exports = {
    typeDef: typeDef,
    query: query,
    mutation: mutation
};