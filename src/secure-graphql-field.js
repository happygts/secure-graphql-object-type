import isNil from 'lodash.isnil'

import {
  ObjectTypeRegistery
} from './index'

const _setHasAccessField = (result, hasAccess) => {
  if (result instanceof Array) {
    result.forEach((r, index) => {
      result[index] = _setHasAccessField(r, hasAccess)
    })
  } else if (typeof result === 'object') {
    result.$hasAccess = hasAccess
  }

  return result
}

export default ({type, resolve, secure, secureCheck, ...otherProps}, fieldKey) => {
  const _resolve = async (parent, args, context, info) => {
    const result = resolve ? await resolve(parent, args, context, info) : parent[fieldKey]

    const hasAccess = secureCheck ? secureCheck(parent, args, context, info) : false

    if (isNil(result) || (secure === true && !(parent.$hasAccess || hasAccess))) {
      return null
    }

    if (typeof result !== 'object') {
      return result
    }

    if (!ObjectTypeRegistery.isRegisteredObjectType(type)) {
      return result
    }

    const securedResult = ObjectTypeRegistery.getAuthorizedFields(result, type, hasAccess)

    return _setHasAccessField(securedResult, hasAccess)
  }

  return {
    type,
    secure,
    resolve: _resolve,
    ...otherProps
  }
}
