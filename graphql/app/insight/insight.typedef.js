const typeDef = `
type insights {
    earnings: earnings
    orders: orders
    performance: performance    
}

type earnings {
    today: Float
    yesterday: Float
    last7days: Float
    thisMonth: Float
}

type orders {
    today: Float
    yesterday: Float
    last7days: Float
    thisMonth: Float
}

type performance {
    cAOV: Float
    cOrderCount: Float
    pAOV: Float
    pOrderCount: Float
}

input InsightInput {
    restaurantCodes: [String]
    day: String
}


`;

const query = `
extend type RootQuery {
insights(insight: InsightInput): insights
}
`;


module.exports = {
    typeDef,
    query
};