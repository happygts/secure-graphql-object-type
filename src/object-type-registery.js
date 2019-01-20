class ObjectTypeRegistery {
  constructor () {
    this._objectTypes = []
    this._fieldToAvoid = ['$hasAccess', '$parent']
  }

  register (objectType) {
    this._objectTypes.push(objectType)
  }

  getAuthorizedFields (fields, objectType, hasAccess) {
    if (hasAccess) {
      return fields
    }

    if (typeof objectType.getFields !== 'function') {
      // Extra security should be useless.
      return fields
    }

    const objectTypeFields = objectType.getFields()
    const objectTypeFieldsKeys = Object.keys(objectTypeFields)
    const newFields = {}

    const fieldsKeys = Object.keys(fields)

    fieldsKeys.forEach(keyField => {
      const objectTypeFieldKey = objectTypeFieldsKeys.find(objectTypeFieldKey => objectTypeFields[objectTypeFieldKey].name === keyField)
      const isFieldToAvoid = this._fieldToAvoid.includes(keyField)

      if (!objectTypeFields[objectTypeFieldKey] && !isFieldToAvoid) {
        console.warn(`Couldn't find key ${keyField} in objectType : ${objectType.name}`)
      } else if (!isFieldToAvoid) {
        if (objectTypeFields[objectTypeFieldKey] && objectTypeFields[objectTypeFieldKey] && !objectTypeFields[objectTypeFieldKey].secure) {
          newFields[keyField] = fields[keyField]
        }
      }
    })

    return newFields
  }
}

const objectTypeRegisteryInstance = new ObjectTypeRegistery()

Object.freeze(objectTypeRegisteryInstance)

export default objectTypeRegisteryInstance