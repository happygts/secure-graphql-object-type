# secure-graphql-object-type
Simple way to secure graphql fields.

# Install
`yarn add secure-graphql-object-type` <br />
`npm install secure-graphql-object-type --save`

# Why ?
In graphQl you can specify that you wanna give access to a field or not using the resolve function.<br />
But imagine this field is a graphQlObjectType, maybe you want to give access to some of his fields but not others.<br />
Staying with graphQlObjectType you could still code this inside the resolve function of every field inside the graphQlObjectType but it can be limited. <br />

Here is an example :

You have a userType which contain a profileType :

```javascript
const UserProfileType = new GraphQLObjectType({
  name: 'UserProfile',
  fields () {
    return {
      firstname: {
        type: GraphQLString
      },
      lastname: {
        type: GraphQLString
      },
      age: {
        type: GraphQlInt
      }
    }
  }
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields () {
    return {
      _id: {
        type: GraphQLID
      },
      profile: {
        type: UserProfileType
      }
    }
  }
})
```

Now if you want to secure the age depending on the user connected correspond to the user we're returning you're stuck because you can't have access inside `UserProfileType` to _id inside `UserType`.<br />
It would still be possible passing the _id to the child UserProfileType and check inside the resolve function to make the check but it's really heavy and not handy:

```javascript
const UserProfileType = new GraphQLObjectType({
  name: 'UserProfile',
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
        resolve (parent, args, context) {
          return context.connectedUserId === parent.$_id ? parent.age : null
        }
      }
    }
  }
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields () {
    return {
      _id: {
        type: GraphQLID
      },
      profile: {
        type: UserProfileType,
        resolve (parent) {
          const _profile = parent.profile

          _profile.$_id = parent._id

          return _profile
        }
      }
    }
  }
})
```

# How ?

Keeping the same problem as above but now using `SecureGraphQlObjectType` you simply have to do that :

```javascript
const UserProfileType = new SecureGraphQlObjectType({
  name: 'UserProfile',
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
      }
    }
  }
})
```

The check will be done in the `secureCheck` function and apply to every sub fields under `UserProfileType` even if `UserProfileType` had another sub field with secure fields it would still apply to those.

You will also see that I use `parent.$hasAccess`.<br />
Every `SecureGraphQlObjectType` will have access to the parent.$hasAccess property, if it's `true` it means that the parent check already passed. If you don't precise any `secureCheck`, it will check by default only parent.$hasAccess if the field is `secure`,
like it does for the `age` under `UserProfile`.

# Details

## fieldsToAvoid :

You can specity an array of `fieldsToAvoid` in every SecureGraphQlObjectType. <br />
By default this array will be equal to `['$hasAccess', '$parent']`

Those fields are not part of the object you wanna return but you still want to use them in sub objectTypes. <br />

If we take our previous example imagine that I want to pass a property $test to my sub objectType `UserProfileType` for no specific reasons here:

```javascript
const UserProfileType = new SecureGraphQlObjectType({
  name: 'UserProfile',
  fieldsToAvoid: ['$hasAccess', '$parent', '$test'],
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
        resolve (parent) {
          // parent.$test === 'My test'

          return parent.age
        },
        secure: true
      }
    }
  }
})

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
        },
        resolve (parent) {
          const _profile = parent.profile

          _profile.$test = 'My test'

          return _profile
        }
      }
    }
  }
})
```

As you can see here I pass the property $test to my profile and to be able to use it inside `UserProfileType` I need to specify that $test will be a fieldsToAvoid.

You can find a sample here :
[Sample](https://github.com/happygts/secure-graphql-object-type/tree/master/sample)
