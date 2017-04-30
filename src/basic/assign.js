var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;

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

suite.add('assign to class context', function() {
  c.do()
})
.add('assign to fn scope', function() {
  sFn()
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
.run({ 'async': true });