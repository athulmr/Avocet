const {
  buildSchema, extendSchema, parse
} = require('graphql');
const Restaurant = require('./restaurant/restaurant.typedef');
const Menu = require('./menu/menu.typedef');
const Category = require('./category/category.typedef');
const Item = require('./item/item.typedef');
const User = require('./user/user.typedef');
const SoldItem = require('./soldItem/sold-item.typedef');
const Cart = require('./cart/cart.typedef');
const Config = require('./config/config.typedef');

const typeDefs = User.typeDef + Menu.typeDef + Category.typeDef + Item.typeDef + Restaurant.typeDef + SoldItem.typeDef + Cart.typeDef + Config.typeDef;
const rootQuery = Menu.query + Category.query + Restaurant.query  + Item.query + Cart.query + Config.query;
const rootMutation = Restaurant.mutation + Category.mutation + Menu.mutation +  Item.mutation + Cart.mutation + Config.mutation;


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
