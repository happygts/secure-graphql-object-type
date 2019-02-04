import isNil from 'lodash.isnil'

import {
  ObjectTypeRegistery
} from './index'

const _setHasAccessToField = (result, hasAccess) => {
  if (result instanceof Array) {
    result.map(r => _setHasAccessToField(r, hasAccess))
  } else if (typeof result === 'object') {
    result.$hasAccess = hasAccess
  }

  return result
}

export default ({type, resolve, secure, secureCheck, ...otherProps}, fieldKey) => {
  const _resolve = async (parent, args, context, info) => {
    const result = resolve ? await resolve(parent, args, context, info) : parent[fieldKey]

    // If no secureCheck was found check if the parent had access or not
    const hasAccess = secureCheck ? secureCheck(parent, args, context, info) : parent.$hasAccess

    if (isNil(result) || (secure === true && !hasAccess)) {
      return null
    }

    if (typeof result !== 'object') {
      return result
    }

    if (!ObjectTypeRegistery.isRegisteredObjectType(type)) {
      return result
    }

    const securedResult = ObjectTypeRegistery.getAuthorizedFields(result, type, hasAccess)

    return _setHasAccessToField(securedResult, hasAccess)
  }

  return {
    type,
    secure,
    resolve: _resolve,
    ...otherProps
  }
}
