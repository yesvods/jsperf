var _ = require('lodash')
var Benchmark = require('benchmark');

class Suite {
  constructor(){
    this.suite = new Benchmark.Suite()
  }
  add(name, fn){
    this.suite.add(name, fn)
    return this
  }
  run(){
    this.suite
    .on('cycle', function(event) {
      console.log(String(event.target));
    })
    .on('complete', function() {
      let fastest = _.first(this.filter('fastest'))
      let slowest = _.first(this.filter('slowest'))
      console.log(`${fastest.name} is ${(fastest.hz/slowest.hz).toPrecision(3)}x faster than ${slowest.name}`)
    })
    .run({ 'async': true });
  }
}

module.exports = Suite