var Suite = require('../suite')
var s = new Suite()
var _ = require('lodash');
var len = 9999
var arr = _.range(len);
s.add('for...of', function() {
    for(let item of arr){
        // doNothing
    }
})
.add('for...in', function() {
    for(let i=0;i<len;i++){
        const item = arr[i];
        // doNothing
    }
})
.run()