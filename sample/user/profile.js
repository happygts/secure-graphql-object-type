import {
  GraphQLString,
  GraphQLObjectType
} from 'graphql'

import {
  SecureGraphQlObjectType
} from 'secure-graphql-object-type'

const UserProfileType = new SecureGraphQlObjectType({
  name: 'UserProfile',
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