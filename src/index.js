const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const { connect } = require('mongoose');
//const { makeExecutableSchema } = require('@graphql-tools/utils');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ApolloServerPluginLandingPageProductionDefault } = require('apollo-server-core');

// //conexion con DataBase mongoDB
// //data base conecction
// const db = process.env.MONGODB || 'mongodb://localhost:27017/ms-taller-app'

// const connectDb = async () => {
//   try {
//       await connect(db);
//       console.log('DB CONNECTED..');
//   } catch (error) {
//       console.error('DB CONNECTION ERROR:', error);
//   }
// }

//mongo atlas connection
const db = 'mongodb+srv://taller:tXr5VDeFTKvEvpT3@app-taller.wphfm1b.mongodb.net/ms-taller-app'

const connectDb = async () => {
    try {
        await connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('DB CONNECTED..');
    } catch (error) {
        console.error('DB CONNECTION ERROR:', error);
    }
}

//inicializar la app
//initializating app
const app = express();
app.use(bodyParser.json());

//typeDfs y resolvers
//typedefs y resolvers
 const typeDefs = require('./merge/mergeSchema');
 const resolvers = require('./merge/mergeResolver');


//configuración del servidor con express
//configuration of express server
const PORT = process.env.PORT || 4003;

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
    console.log(`app-taller ready at port: ${PORT}`);
    connectDb()
  })
}

//iniciando servidor
start()
