
const restaurantResolver = require('./restaurant/restaurant.resolvers');
const menuResolver = require('./menu/menu.resolvers');
const categoryResolver = require('./category/category.resolvers');
const itemResolver = require('./item/item.resolvers');

const rootResolver = {
  ...restaurantResolver,
  ...menuResolver,
  ...categoryResolver,
  ...itemResolver
};

module.exports = rootResolver;