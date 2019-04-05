
const ownerResolver = require('./owners');
const restaurantResolver = require('./restaurants');
const menuResolver = require('./menu');
const itemResolver = require('./item');

const rootResolver = {
  ...ownerResolver,
  ...restaurantResolver,
  ...menuResolver,
  ...itemResolver  
};

module.exports = rootResolver;