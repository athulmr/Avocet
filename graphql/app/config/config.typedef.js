const typeDef = `
type Config {
    _id: ID!
    restaurant: ID!
    delivery: [Delivery!]
}

type Delivery {
    code: String
    pkgCharge: Float
    fcpo: String
    fcpoMinOrder: String
    discounts: [Discount]
    default: Boolean
    active: Boolean
}

type Discount {
    percent: Float
    minOrder: Float
    maxDiscount: Float
    active: Boolean
}

input DiscountInput {
    percent: Float!
    minOrder: Float
    maxDiscount: Float
}

input DeliveryInput {
    code: String
    pkgCharge: Float
    fcpo: Float
    fcpoMinOrder: Float
    discounts: [DiscountInput]
}

input ConfigInput {
    id: ID
    restaurant: ID!
    delivery: [DeliveryInput!]
}

type ConfigOutput {
    data: [Config]
    error: String
}
`;

const query = `
extend type RootQuery {
configs(config: ConfigInput): ConfigOutput
}
`

const mutation =`
extend type RootMutation {
saveConfig(config: ConfigInput): ConfigOutput 
}
`;

module.exports = {
    typeDef,
    query,
    mutation
};