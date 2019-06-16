
const ownerResolver = require('./ownerResolvers');
const restaurantResolver = require('./restaurantResolvers');
const menuResolver = require('./menuResolvers');
const itemResolver = require('./itemResolvers');
const staffResolver = require('./staffResolvers')

const rootResolver = {
  ...ownerResolver,
  ...restaurantResolver,
  ...menuResolver,
  ...itemResolver,
  ...staffResolver,
};

module.exports = rootResolver;