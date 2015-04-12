var util = require('util')
var HashMap = require('hashmap').HashMap

module.exports = function (program) {
  gen(program)  
}

var indentPadding = 4
var indentLevel = 0

function emit(line) {
  var pad = indentPadding * indentLevel
  console.log(Array(pad+1).join(' ') + line)
}

function generate(node){
    return generator
}

var generator = {
    
    'Script': function (program) {
        emit('#include <iostream>')
        emit('int main() {')        
    }
    
    
    
}