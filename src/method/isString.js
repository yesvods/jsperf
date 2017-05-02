var Suite = require('../suite')
var s = new Suite()

const isType = (val, type) => typeof val == type
const isString = val => isType(val, 'string')

s.add('isString', function() {
  isString('x')
})
.add('isString', function() {
  isString(1)
})
.run()