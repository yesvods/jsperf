let arr = []
let arrMap = {}
let sum = 999999
let half = Math.floor(sum/2)
for(var i = 0;i<sum;i++){
  arr[i] = i
  arrMap[i] = i
}

var Suite = require('../suite')
var s = new Suite()
s.add('indexOf', function() {
  arr.indexOf(half)
})
.add('arrayMap', function(){
  arr[half]
})
.add('map', function() {
  arrMap[half]
})
.run()