const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const graphqlHttp = require('express-graphql');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const graphQlSchema = require('./graphql/app/app.schema');
const graphQlResolvers = require('./graphql/app/app.resolvers');
const version = require('./constants/version');

const passport = require('passport');
const passportJWT = passport.authenticate('jwt', { session: false });

const app = express();

dotenv.config();

const whitelist = process.env.whiteList;

const corsOptions = {
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, true)
    }
  }
}

const corsOptionsGraphql = {
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true
  }, (err,data) => {
    err ? console.log('ERROR', err) : console.log ('💾  Connected to Database')
});

// Logger Middleware
const logger = (req, res, next) => {
    console.log(req.method,req.path,'\n Body',JSON.stringify(req.body),'\n Cookies', JSON.stringify(req.cookies),'\n');
    next();
}

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(logger);
app.use('/users', require('./routes/users.routes'));

app.get('/', (req, res) =>{
    res.json({'message':'Avocet API version:' + version.VERSION.semverString}).status(200);
})

// app.use();

app.use(cors(corsOptionsGraphql));

app.use(
    '/graphql',
    passportJWT,
    graphqlHttp({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true
    })
  );

app.listen(PORT, (err) =>{
   err ? console.log('ERROR', err) : console.log('🚀  Server ready at port', PORT);
});

module.exports = app;