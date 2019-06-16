
const ownerResolver = require('./app/owner/owner.resolver');
const restaurantResolver = require('./app/restaurant/restaurant.resolver');
const menuResolver = require('./app/menu/menu.resolver');
const itemResolver = require('./app/item/item.resolver');
const staffResolver = require('./app/staff/staff.resolver')

const rootResolver = {
  ...ownerResolver,
  ...restaurantResolver,
  ...menuResolver,
  ...itemResolver,
  ...staffResolver,
};

module.exports = rootResolver;