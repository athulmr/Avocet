const typeDef = `
type Table {
    resturantId: Resturant!
    code: String!
    capacity: Int!
    occupied: Boolean!
    bookingStatus: [BookingStatus!]
}
`;

module.exports = typeDef;