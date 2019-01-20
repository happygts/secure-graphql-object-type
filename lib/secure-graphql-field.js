'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref, fieldKey) {
  var type = _ref.type,
      resolve = _ref.resolve,
      secure = _ref.secure,
      secureCheck = _ref.secureCheck,
      otherProps = (0, _objectWithoutProperties3.default)(_ref, ['type', 'resolve', 'secure', 'secureCheck']);

  var _resolve = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(parent, args, context, info) {
      var result, hasAccess, securedResult;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!resolve) {
                _context.next = 6;
                break;
              }

              _context.next = 3;
              return resolve(parent, args, context, info);

            case 3:
              _context.t0 = _context.sent;
              _context.next = 7;
              break;

            case 6:
              _context.t0 = parent[fieldKey];

            case 7:
              result = _context.t0;
              hasAccess = secureCheck ? secureCheck(parent, args, context, info) : false;

              if (!(!result || secure === true && !(parent.$hasAccess || hasAccess))) {
                _context.next = 11;
                break;
              }

              return _context.abrupt('return', null);

            case 11:
              if (!((typeof result === 'undefined' ? 'undefined' : (0, _typeof3.default)(result)) !== 'object')) {
                _context.next = 13;
                break;
              }

              return _context.abrupt('return', result);

            case 13:
              if (_index.ObjectTypeRegistery._objectTypes.includes(type)) {
                _context.next = 15;
                break;
              }

              return _context.abrupt('return', result);

            case 15:
              securedResult = _index.ObjectTypeRegistery.getAuthorizedFields(result, type, hasAccess);


              securedResult.$hasAccess = hasAccess;

              return _context.abrupt('return', securedResult);

            case 18:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function _resolve(_x, _x2, _x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  return (0, _extends3.default)({
    type: type,
    secure: secure,
    resolve: _resolve
  }, otherProps);
};