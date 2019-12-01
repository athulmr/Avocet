
const restaurantResolver = require('./restaurant/restaurant.resolvers');
const menuResolver = require('./menu/menu.resolvers');
const categoryResolver = require('./category/category.resolvers');
const itemResolver = require('./item/item.resolvers');
const cartResolver = require('./cart/cart.resolvers');
const configResolver = require('./config/config.resolvers');
const insightsResolver = require('./insight/insight.resolvers');

const rootResolver = {
  ...restaurantResolver,
  ...menuResolver,
  ...categoryResolver,
  ...itemResolver,
  ...cartResolver,
  ...configResolver,
  ...insightsResolver
};

module.exports = rootResolver;