
const ownerResolver = require('./owners');
const resturantResolver = require('./resturants');
const menuResolver = require('./menu');

const rootResolver = {
  ...ownerResolver,
  ...resturantResolver,
  ...menuResolver
};

module.exports = rootResolver;