import {
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean
} from 'graphql'

import {
  SecureGraphQlObjectType
} from 'secure-graphql-object-type'

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
      },
      drinkMilk: {
        type: GraphQLBoolean
      }
    }
  }
})

export default UserProfileType