
const ownerResolver = require('./owner/owner.resolvers');
const restaurantResolver = require('./restaurant/restaurant.resolvers');
const menuResolver = require('./menu/menu.resolvers');
const itemResolver = require('./item/item.resolvers');
const staffResolver = require('./staff/staff.resolvers')
const authDataResolver = require('./auth/authData.resolvers');

const rootResolver = {
  ...ownerResolver,
  ...restaurantResolver,
  ...menuResolver,
  ...itemResolver,
  ...staffResolver,
  ...authDataResolver
};

module.exports = rootResolver;