const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const { connect } = require('mongoose');
const { makeExecutableSchema } = require('graphql-tools');
const { ApolloServerPluginLandingPageProductionDefault } = require('apollo-server-core');

//conexion con DataBase mongoDB
//data base conecction
const db = process.env.MONGODB || 'mongodb://localhost:27017/ms-taller-app'

const connectDB = () => {
  try {
    connect(db)
    console.log('db connected');
  } catch (error) {
    return error
  }
}

//inicializar la app
//initializating app
const app = express();
app.use(bodyParser.json());

//typeDfs y resolvers
//typedefs y resolvers
const typeDefs = require('./merge/mergeSchema');
const resolvers = require('./merge/mergeSchema');

//configuración del servidor con express
//configuration of express server
const PORT = process.env.PORT || 4000;

//configuración del servidor de apollo y la conexion con el servidor de express
//configuration of Apollo server an connection with express server
async function start(){
  const schema = makeExecutableSchema({typeDefs, resolvers})
  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginLandingPageProductionDefault({
        embed: true
      })
    ]
  })
  await apolloServer.start();
  apolloServer.applyMiddleware({app});

  app.listen(PORT, () => {
    console.log(`app-taller ready at ${PORT}`);
    connectDB
  })
}

//iniciando servidor
start()
