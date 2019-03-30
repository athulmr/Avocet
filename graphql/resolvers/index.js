
const ownerResolver = require('./owners');
const resturantResolver = require('./resturants');

const rootResolver = {
  ...ownerResolver,
  ...resturantResolver,
};

module.exports = rootResolver;