const typeDef = `
type insights {
    earnings: earnings
    orders: orders
    performance: performance
    items: [ItemInsight]
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

type ItemInsight {
    code: String
    sold: Float
    priceFreq: [PriceFreq]
}

type PriceFreq  {
    price: Float,
    freq: Int
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