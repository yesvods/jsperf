var Suite = require('../suite')
var s = new Suite()

let str = ''
for(let i=0;i<99999;i++){
  str+=i
}

let start = 1000
let end = 1100

let tmp = []
let index = start
while(index<end){
  tmp.push(str.charAt(index))
  index++
}

s
.add('substring', function() {
  str.substring(start, end)
})
.add('+=', function() {
  let tmp = ''
  for(let i=0;i<100;i++){
    tmp+='x'
  }
})
.add('arrayJoin', function(){
  tmp.join('')
})
.run()