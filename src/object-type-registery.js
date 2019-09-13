class ObjectTypeRegistery {
  /**
   * _objectTypesContainer = [{
   *    objectType,
   *    fieldsToAvoid
   * }]
   */
  constructor () {
    this._objectTypesContainer = {}
  }

  register (objectType, fieldsToAvoid) {
    if (!objectType) {
      throw new Error(`Trying to register an undefined objectType.`)
    }

    if (!objectType.name) {
      throw new Error(`Trying to register the objectType: ${objectType} with an undefined name.`)
    }

    if (this._objectTypesContainer[objectType.name]) {
      throw new Error(`Trying to register an existing objectType: ${objectType.name}`)
    }

    this._objectTypesContainer[objectType.name] = {objectType, fieldsToAvoid}
  }

  getObjectType (type) {
    if (type && type.ofType) {
      return this.getObjectType(type.ofType)
    }

    return type
  }

  isRegisteredObjectType (type) {
    const objectType = this.getObjectType(type) || {}

    return !!this._objectTypesContainer[objectType.name]
  }

  getAuthorizedFields (fields, objectType, hasAccess) {
    if (hasAccess) {
      return fields
    }

    if (!objectType || typeof objectType.getFields !== 'function') {
      return fields
    }

    const objectTypeFields = objectType.getFields()
    const fieldsToAvoid = this._getFieldsToAvoid(objectType.name)
    const objectTypeFieldsKeys = Object.keys(objectTypeFields)
    const newFields = {}

    const fieldsKeys = fields['_doc'] ? Object.keys(fields['_doc']) : Object.keys(fields)

    fieldsKeys.forEach(keyField => {
      const objectTypeFieldKey = objectTypeFieldsKeys.find(objectTypeFieldKey => objectTypeFields[objectTypeFieldKey].name === keyField)
      const isFieldToAvoid = fieldsToAvoid.includes(keyField)

      if (isFieldToAvoid ||
        (objectTypeFields[objectTypeFieldKey] && !objectTypeFields[objectTypeFieldKey].secure)) {
        newFields[keyField] = fields[keyField];
      }
    })

    return newFields
  }
  
  _getFieldsToAvoid (objectTypeName) {
    if (!objectTypeName || !this._objectTypesContainer[objectTypeName]) {
      return []
    }

    return this._objectTypesContainer[objectTypeName].fieldsToAvoid
  }
}

const objectTypeRegisteryInstance = new ObjectTypeRegistery()

Object.freeze(objectTypeRegisteryInstance)

export default objectTypeRegisteryInstance