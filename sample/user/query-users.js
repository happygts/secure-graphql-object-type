import {
  GraphQLList
} from 'graphql'

import fakeUsers from './hard-codded-users'

import UserType from './user'

export default {
  type: new GraphQLList(UserType),
  resolve () {
    return fakeUsers
  }
}