'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _freeze = require('babel-runtime/core-js/object/freeze');

var _freeze2 = _interopRequireDefault(_freeze);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ObjectTypeRegistery = function () {
  function ObjectTypeRegistery() {
    (0, _classCallCheck3.default)(this, ObjectTypeRegistery);

    this._objectTypes = [];
    this._fieldToAvoid = ['$hasAccess', '$parent'];
  }

  (0, _createClass3.default)(ObjectTypeRegistery, [{
    key: 'register',
    value: function register(objectType) {
      this._objectTypes.push(objectType);
    }
  }, {
    key: 'getAuthorizedFields',
    value: function getAuthorizedFields(fields, objectType, hasAccess) {
      var _this = this;

      if (hasAccess) {
        return fields;
      }

      if (typeof objectType.getFields !== 'function') {
        // Extra security should be useless.
        return fields;
      }

      var objectTypeFields = objectType.getFields();
      var objectTypeFieldsKeys = (0, _keys2.default)(objectTypeFields);
      var newFields = {};

      var fieldsKeys = (0, _keys2.default)(fields);

      fieldsKeys.forEach(function (keyField) {
        var objectTypeFieldKey = objectTypeFieldsKeys.find(function (objectTypeFieldKey) {
          return objectTypeFields[objectTypeFieldKey].name === keyField;
        });
        var isFieldToAvoid = _this._fieldToAvoid.includes(keyField);

        if (!objectTypeFields[objectTypeFieldKey] && !isFieldToAvoid) {
          console.warn('Couldn\'t find key ' + keyField + ' in objectType : ' + objectType.name);
        } else if (!isFieldToAvoid) {
          if (objectTypeFields[objectTypeFieldKey] && objectTypeFields[objectTypeFieldKey] && !objectTypeFields[objectTypeFieldKey].secure) {
            newFields[keyField] = fields[keyField];
          }
        }
      });

      return newFields;
    }
  }]);
  return ObjectTypeRegistery;
}();

var objectTypeRegisteryInstance = new ObjectTypeRegistery();

(0, _freeze2.default)(objectTypeRegisteryInstance);

exports.default = objectTypeRegisteryInstance;