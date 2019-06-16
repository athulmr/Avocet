
const ownerResolver = require('./app/owner/ownerResolvers');
const restaurantResolver = require('./app/restaurant/restaurantResolvers');
const menuResolver = require('./app/menu/menuResolvers');
const itemResolver = require('./app/item/itemResolvers');
const staffResolver = require('./app/staff/staffResolvers')

const rootResolver = {
  ...ownerResolver,
  ...restaurantResolver,
  ...menuResolver,
  ...itemResolver,
  ...staffResolver,
};

module.exports = rootResolver;