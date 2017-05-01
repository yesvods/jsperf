var Suite = require('../suite')
var s = new Suite()

class C {
  constructor(){
    this.count = 0
  }
  do(){
    for(let i = 0; i< 10000000;i++ ){
      this.count = i
    }
  }
}

const S = () => {
  var count = 0
  return () => {
    for(let i = 0; i< 10000000;i++ ){
      count = i
    }  
  }
}

const c = new C()
const sFn = S()

s
.add('assign to class context', function() {
  c.do()
})
.add('assign to fn scope', function() {
  sFn()
})
.run();