var _ = require('lodash')
var Benchmark = require('benchmark');

const compareValuate = {
  2: 'has similar performancem with',
  10: 'is faster',
  100: 'is much faster',
  1000: 'is great faster',
  10000: 'is blazing faster'
}

const singleValuate = {
  5: 'can run without considering performance',
  50: 'has gread performance',
  500: 'should be considerateed when invoke',
  5000: 'should be better not to use in frequency',
  50000: 'should not be use in production'
}

const getCompareResult = (x, valuate) => {
  for (let key in valuate) {
    console.log(x, key)
    if (+x < +key) {
      return valuate[key]
    }
  }
  return ''
}

function compare(base, a, b) {
  let res = ''
  let aDivB = (a.hz / b.hz).toPrecision(3)
  const baseDivA = (base / a.hz).toPrecision(3)
  const baseDivB = (base / b.hz).toPrecision(3)

  res = `${a.name} ${getCompareResult(aDivB, compareValuate)} ${b.name} (${aDivB}x)`
  res += `\n${a.name} ${getCompareResult(baseDivA, singleValuate)} (${baseDivA}x)`
  res += `\n${b.name} ${getCompareResult(baseDivB, singleValuate)} (${baseDivB}x)`

  return res
}

class Suite {
  constructor() {
    this.runBlank = true
    this.init()
  }
  init() {
    this.suite = new Benchmark.Suite()
    if (this.runBlank) {
      this.suite.add('System Base Performance', _.noop)
    }
  }
  add(name, fn) {
    this.suite.add(name, fn)
    return this
  }
  run() {
    let _context = this
    this.suite
      .on('cycle', function(event) {
        console.log(String(event.target));
      })
      .on('complete', function() {
        let result = _.toArray(this)
        if (_context.runBlank) {
          let sys = result.shift()
          _context.runBlank = false
          _context.baseHz = sys.hz
        }

        let fastest = _.last(_.sortBy(result, x => x.hz))
        let slowest = _.first(_.sortBy(result, x => x.hz))

        let res = compare(_context.baseHz, fastest, slowest)
        console.log(res)
        _context.init()
      })
      .run({
        'async': true
      });
  }
}

module.exports = Suite