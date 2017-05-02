var Suite = require('../suite')
var s = new Suite()

let a = '1'
let b = 1
s.add('===', function() {
  1 === 1
})
.add('==', function() {
  1 == 1
})
.run()
