import isNil from 'lodash.isnil'

import {
  ObjectTypeRegistery
} from './index'

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

    securedResult.$hasAccess = hasAccess

    return securedResult
  }

  return {
    type,
    secure,
    resolve: _resolve,
    ...otherProps
  }
}
