import {
  GraphQLString,
  GraphQLInt
} from 'graphql'

import {
  SecureGraphQlObjectType
} from 'secure-graphql-object-type'

console.log('GraphQlInt :', GraphQLInt, 'GraphQLString :', GraphQLString)

const UserProfileType = new SecureGraphQlObjectType({
  name: 'UserProfile',
  fieldsToAvoid: ['$hasAccess', '$parent'],
  fields () {
    return {
      firstname: {
        type: GraphQLString
      },
      lastname: {
        type: GraphQLString
      },
      age: {
        type: GraphQLInt,
        secure: true
      }
    }
  }
})

export default UserProfileType