const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const graphqlHttp = require('express-graphql');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

dotenv.config();

const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true}, (err,data) => {
    err ? console.log('ERROR', err) : console.log ('Connected to Database')
});

const logger = (req, res, next) => {
    console.log(req.method,req.path);
    next();
}

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(logger);

app.get('/', (req, res) =>{
    res.json({'message':'Avocet (Resturant Management System) Welcomes you :) '}).status(200);
})

app.use(
    '/graphql',
    graphqlHttp({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true
    })
  );

app.listen(port, (err) =>{
   err ? console.log('ERROR', err) : console.log('Listning on port', port);
});

module.exports = app;