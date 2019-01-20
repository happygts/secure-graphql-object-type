'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _graphql = require('graphql');

var _secureGraphqlField = require('./secure-graphql-field');

var _secureGraphqlField2 = _interopRequireDefault(_secureGraphqlField);

var _objectTypeRegistery = require('./object-type-registery');

var _objectTypeRegistery2 = _interopRequireDefault(_objectTypeRegistery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SecureGraphQlObjectType = function (_GraphQLObjectType) {
  (0, _inherits3.default)(SecureGraphQlObjectType, _GraphQLObjectType);

  function SecureGraphQlObjectType(_ref) {
    var fields = _ref.fields,
        config = (0, _objectWithoutProperties3.default)(_ref, ['fields']);
    (0, _classCallCheck3.default)(this, SecureGraphQlObjectType);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SecureGraphQlObjectType.__proto__ || (0, _getPrototypeOf2.default)(SecureGraphQlObjectType)).call(this, (0, _extends3.default)({}, config, {
      fields: fields
    })));

    if (typeof fields !== 'function') {
      throw new Error('Cannot run since ' + config.name + ' fields are not created with a function.');
    }

    _objectTypeRegistery2.default.register(_this);
    return _this;
  }

  (0, _createClass3.default)(SecureGraphQlObjectType, [{
    key: 'getFields',
    value: function getFields() {
      var fields = (0, _get3.default)(SecureGraphQlObjectType.prototype.__proto__ || (0, _getPrototypeOf2.default)(SecureGraphQlObjectType.prototype), 'getFields', this).call(this);
      var unsecuredFields = typeof fields === 'function' ? fields() : (0, _assign2.default)({}, fields);
      var secureFields = (0, _assign2.default)({}, unsecuredFields);

      (0, _keys2.default)(secureFields).map(function (fieldKey) {
        secureFields[fieldKey] = (0, _secureGraphqlField2.default)(unsecuredFields[fieldKey], fieldKey);
      });

      return secureFields;
    }
  }]);
  return SecureGraphQlObjectType;
}(_graphql.GraphQLObjectType);

exports.default = SecureGraphQlObjectType;