const express = require('express');
const graphqlHTTP = require('express-graphql');

import {
  GraphQLSchema,
  GraphQLObjectType
} from 'graphql'

import {
  queryUsers
} from './user'

export const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'TestRootQuery',
    fields: {
      getUsers: queryUsers
    }
  })
})

var app = express();

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  context: {
    userId: '0'
  },
  graphiql: true
}));

console.log('App running on port 4000')
app.listen(4000);