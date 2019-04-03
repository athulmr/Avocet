
const ownerResolver = require('./owners');
const resturantResolver = require('./resturants');
const menuResolver = require('./menu');
const itemResolver = require('./item');

const rootResolver = {
  ...ownerResolver,
  ...resturantResolver,
  ...menuResolver,
  ...itemResolver  
};

module.exports = rootResolver;