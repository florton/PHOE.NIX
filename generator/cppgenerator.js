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

function gen(node){
    return gen[node.constructor.name](node)
}

var makeVariable = (function () {
  var lastId = 0
  var map = new HashMap()
  return function (variable) {
    if (!map.has(variable)) map.set(variable, ++lastId)
    return '_v' + map.get(variable)
  }
}())

var generator = {
    
    'script': function (program) {
        emit('#include <iostream>')
        emit('#include <stdio.h>')
        emit('#include <string>')
        emit('#include <vector>')
        emit('using namespace std;')
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
    },

    'assignmentStatement': function (statement) {
        for(var i = 0 ; i<gen(statement.names.length);i++){
            emit(util.format('%s %s %s;', gen(statement.names[i]), gen(statement.operator),gen(statement.exp)))
        }
    },

    'whileStatement': function (statement) {
        emit('while (' + gen(statement.condition) + ') {')
        gen(statement.block);
        emit('}')
    },

    'doStatement' : function (statement) {
        emit('do {')
        gen(statement.block);
        emit('} while('+gen(statement.exp)+');')
    },

    'ifStatement' : function (statement) {
        emit('if('+gen(statement.exp)+') {')
        gen(statement.block);
        emit('}')
    },

    'forStatement' : function (statement) {
        emit('for('+ gen(statement.statement) + ';'+ gen(statement.condition)+';'+gen(statement.incrementer)+') {')
        gen(statement.block);
        emit('}')
    },

    'classDec' : function (declaration) {
        emit('class '+gen(declaration.name)+'{')
        gen(statement.block);
        emit('}')
    },

    'elseStatement' : function (statement) {
        emit('else {')
        gen(statement.block);
        emit('}')

    },

    'addop' : function(exp){
        emit(util.format('%s %s %s', gen(exp.left), gen(exp.op), gen(exp.right)))
    }

    'arrayIndex' : function(array){
        
    }

    'attribute' : function(attr){
        emit(util.format('%s.%s', gen(attr.left),gen(attr.right)))
    }

    'funcDec' : function(func){
        emit(gen(func.type) + ' ' + gen(func.name) +'('+ 
        for(var i = 0 ; i<gen(func.params.length);i++){
            if(gen(func.params[i])=== gen(func.params.length-1)){
                gen(func.params[i])
            }else{
                gen(func.params[i])+','
            }
        } + ')')
        emit(gen(func.block))
        emit('}')
    }

    'memberDec' : function(declaration){
        emit(gen(declaration.access)+':')
        gen(statement.block)
        emit('}')
    }

    'methodCall' : function(method){
        emit(gen(method.name)+'('+
        for(var i = 0 ; i<gen(method.args.length);i++){
            if(gen(method.args[i])=== gen(method.args.length-1)){
                gen(method.args[i])
            }else{
                gen(method.args[i])+','
            }
        } + ')')
    }

    'printStatement' : function(statement){
        emit('cout<< '+for(var i = 0 ; i<gen(statement.exps.length);i++){
                           if(gen(statement.exps[i])=== gen(statement.exps.length-1)){
                               gen(statement.exps[i])
                           }else{
                                gen(statement.exps[i])+'<<'
            }   })
    }

    'promptStatement' : function(statement){
        statement.exps.forEach(function (variable) {
            emit(util.format('scanf("%%d\\n", &%s);', makeVariable(variable.referent)))
        })
    }

    'returnStatement' : function(statement){
        emit(util.format('return %s;', gen(statement.exp[0])))
    }

    'varDec' : function(statement){
        emit(util.format('%s %s %s;', gen(statement.type), makeVariable(statement.name), gen(statement.exp)))
    }

    'postfixop' : function(expression){
        util.format('(%s %s)',gen(expression.exp),gen(expression.op))
    }

    'prefixop' : function(expression){
        return util.format('(%s %s)',gen(expression.op),gen(expression.exp))
    }

    'multop' : function(expression){
        return util.format('%s %s %s', gen(exp.left), gen(exp.op), gen(exp.right))
    }

    'relop' : function(expression){
        return util.format('%s %s %s', gen(exp.left), gen(exp.op), gen(exp.right))
    }

    'scope' : function(expression){
        return util.format('%s %s %s', gen(exp.left), gen(exp.op), gen(exp.right))
    }

    'BooleanLiteral': function (literal) {
        return literal.toString()
    },

    'intLit': function (literal) {
        return literal.toString()
    },

    'doubleLit': function (literal) {
        return literal.toString()
    },

    'stringLit': function (literal) {
        return literal.toString()
    } 
}