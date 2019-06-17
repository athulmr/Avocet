const {
  buildSchema, extendSchema, parse
} = require('graphql');
const Owner = require('./owner/owner.typedef');
const Restaurant = require('./restaurant/restaurant.typedef');
const Staff = require('./staff/staff.typedef');
const Menu = require('./menu/menu.typedef');
const Images = require('./images/images.typedef');
const Item = require('./item/item.typedef');

const typeDefs = Menu.typeDef + Images + Item.typeDef + Owner.typeDef + Restaurant.typeDef + Staff.typeDef;
const rootQuery = Menu.query + Restaurant.query + Owner.query + Item.query;
const rootMutation = Restaurant.mutation + Menu.mutation + Staff.mutation + Owner.mutation + Item.mutation;


let schema = buildSchema(typeDefs + `

type RootQuery {
  _empty: String  
}

type RootMutation {`
+rootMutation+
`
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`);

schema = extendSchema(schema, parse(rootQuery));

module.exports = schema
