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
    return generator[node.constructor.name](node)
}

var generator = {
    
    'Script': function (program) {
        emit('#include <iostream>')
        emit('int main(int argc, char** argv) {')
        indentLevel++
        emit('char** args[argc]= argv;')
        indentLevel--
        gen(program.block)
        indentLevel++
        emit('return 0;')
        indentLevel--
        mit('}')
    },
    
    'Block': function (block) {
        indentLevel++
        block.statements.forEach(function (statement) {
            gen(statement)
        })
        indentLevel--
    }
    
    
    
}