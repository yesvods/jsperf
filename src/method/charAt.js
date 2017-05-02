var Suite = require('../suite')
var s = new Suite()
var str = "x"
s.add('charAt', function() {
  str.charAt(0)
})
.add('charCodeAt', function() {
  str.charCodeAt(1)
})
.run()