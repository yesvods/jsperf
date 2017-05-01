var Suite = require('../suite')
var s = new Suite()
s.add('if(value)', function() {
  for(let i =1;i<99999;i++){
    if(i){}
  }
})
.add('if(true)', function() {
  for(let i =1;i<99999;i++){
    if(true){}
  }
})
.run()