import {
  GraphQLID,
  GraphQLString
} from 'graphql'

import {
  SecureGraphQlObjectType
} from 'secure-graphql-object-type'

import UserProfileType from './profile'

const UserType = new SecureGraphQlObjectType({
  name: 'User',
  fields () {
    return {
      _id: {
        type: GraphQLID
      },
      profile: {
        type: UserProfileType,
        secureCheck (parent, args, context) {
          const parentHasAccess = parent.$hasAccess
          const userHasAccess = parent._id === context.userId 

          const hasAccess = parentHasAccess || userHasAccess

          return hasAccess
        }
      },
      email: {
        type: GraphQLString,
        secureCheck (parent, args, context) {
          const parentHasAccess = parent.$hasAccess
          const userHasAccess = parent._id === context.userId 

          const hasAccess = parentHasAccess || userHasAccess

          return hasAccess
        },
        secure: true
      }
    }
  }
})

export default UserType
