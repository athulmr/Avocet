
const ownerResolver = require('./owners');
const restaurantResolver = require('./restaurants');
const menuResolver = require('./menu');
const itemResolver = require('./item');
const staffResolver = require('./staff')

const rootResolver = {
  ...ownerResolver,
  ...restaurantResolver,
  ...menuResolver,
  ...itemResolver,
  ...staffResolver,
};

module.exports = rootResolver;