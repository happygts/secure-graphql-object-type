import {
  GraphQLObjectType
} from 'graphql'

import secureGraphqlField from './secure-graphql-field'
import objectTypeRegisteryInstance from './object-type-registery'

class SecureGraphQlObjectType extends GraphQLObjectType {
  constructor ({ fields, fieldsToAvoid = ['$hasAccess', '$parent'], ...config }) {
    super({
      ...config,
      fields
    })

    if (typeof fields !== 'function') {
      throw new Error(`Cannot run since ${config.name} fields are not created with a function.`)
    }

    if (!fieldsToAvoid.includes('$hasAccess')) {
      throw new Error(`Cannot run since ${config.name} fieldsToAvoid doesn't contain $hasAccess.`)
    }

    objectTypeRegisteryInstance.register(this, fieldsToAvoid)
  }

  getFields () {
    const fields = super.getFields()
    const unsecuredFields = typeof fields === 'function' ? fields() : Object.assign({}, fields)
    const secureFields = Object.assign({}, unsecuredFields)

    Object.keys(secureFields).map(fieldKey => {
      secureFields[fieldKey] = secureGraphqlField(unsecuredFields[fieldKey], fieldKey)
    })

    return secureFields
  }
}

export default SecureGraphQlObjectType