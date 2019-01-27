import {
  GraphQLString,
  GraphQLObjectType
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
        type: GraphQLString,
        secure: true
      }
    }
  }
})

export default UserProfileType