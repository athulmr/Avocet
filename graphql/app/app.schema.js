const {
  buildSchema, extendSchema, parse
} = require('graphql');
const Restaurant = require('./restaurant/restaurant.typedef');
const Menu = require('./menu/menu.typedef');
const Category = require('./category/category.typedef');
const Item = require('./item/item.typedef');
const User = require('./user/user.typedef');
const ItemSold = require('./ItemSold/item-sold.typedef')
const SaleOrder = require('./saleOrder/sale-order.typedef')

const typeDefs = User.typeDef + Menu.typeDef + Category.typeDef + Item.typeDef + Restaurant.typeDef + ItemSold.typeDef + SaleOrder.typeDef;
const rootQuery = Menu.query + Category.query + Restaurant.query  + Item.query + SaleOrder.query;
const rootMutation = Restaurant.mutation + Category.mutation + Menu.mutation +  Item.mutation + SaleOrder.mutation;


let schema = buildSchema(typeDefs + `

type RootQuery {
  _empty: String  
}

type RootMutation {
  _empty: String
}

schema {
    query: RootQuery
    mutation: RootMutation
}

`);

schema = extendSchema(schema, parse(rootQuery + rootMutation));

module.exports = schema
