const typeDef = `
type Table {
    restaurantId: Restaurant!
    code: String!
    capacity: Int!
    occupied: Boolean!
    bookingStatus: [BookingStatus!]
}
`;

module.exports = typeDef;