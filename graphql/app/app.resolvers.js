
const ownerResolver = require('./owner/owner.resolver');
const restaurantResolver = require('./restaurant/restaurant.resolver');
const menuResolver = require('./menu/menu.resolver');
const itemResolver = require('./item/item.resolver');
const staffResolver = require('./staff/staff.resolver')

const rootResolver = {
  ...ownerResolver,
  ...restaurantResolver,
  ...menuResolver,
  ...itemResolver,
  ...staffResolver,
};

module.exports = rootResolver;