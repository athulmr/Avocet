const {
  buildSchema
} = require('graphql');
const Owner = require('./owner/owner.typedef');
const Restaurant = require('./restaurant/restaurant.typedef');
const Staff = require('./staff/staff.typedef');
const Menu = require('./menu/menu.typedef');
const Images = require('./images/images.typedef');
const Item = require('./item/item.typedef');

const typeDefs = Menu.typeDef + Images + Item.typeDef + Owner.typeDef + Restaurant.typeDef + Staff.typeDef;
const inputs = Menu.input + Item.input + Restaurant.input + Owner.input + Staff.input;
const queryInputs = Menu.queryInput + Item.queryInput;
const rootQuery = Restaurant.query + Owner.query + Item.query;
const rootMutation = Restaurant.mutation + Menu.mutation + Staff.mutation + Owner.mutation + Item.mutation;


module.exports = buildSchema(typeDefs + inputs + queryInputs + `

type RootQuery {`
  +rootQuery+
  `
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
