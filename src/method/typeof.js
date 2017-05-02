var Suite = require('../suite')
var s = new Suite()

let v1 = 1
let v2 = 'x'
s.add('typeof', function() {
  typeof v1
})
.add('typeof', function() {
  typeof v2 
})
.run()
