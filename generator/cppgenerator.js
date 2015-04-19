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
    console.log(node.constructor.name)
    console.log(node)
    return generator[node.constructor.name](node)
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
        emit('}')
    },
    
    'Block': function (block) {
        indentLevel++
        block.statements.forEach(function (statement) {
            gen(statement)
        })
        indentLevel--
    },

    'assignmentStatement': function (statement) {
        emit(util.format('%s %s %s;', statement.name, statement.operator, gen(statement.exp)))
    },

    'whileStatement': function (statement) {
        emit('while (' + gen(statement.condition) + ') {')
        gen(statement.block);
        emit('}')
    },

    'doStatement' : function (statement) {
        emit('do {')
        gen(statement.block);
        emit('} while('+ gen(statement.exp) +');')
    },

    'ifStatement' : function (statement) {
        emit('if('+ gen(statement.exp) +') {')
        gen(statement.block);
        emit('}')
    },

    'forStatement' : function (statement) {
        emit('for('+ gen(statement.statement) + ';'+ gen(statement.condition)+';'+gen(statement.incrementer)+') {')
        gen(statement.block);
        emit('}')
    },

    'classDec' : function (declaration) {
        emit('class '+ declaration.name +'{')
        makeVariable(declaration.name)
        gen(statement.block);
        emit('}')
    },

    'elseStatement' : function (statement) {
        emit('else {')
        gen(statement.block);
        emit('}')
    },

    'arrayIndex' : function(array){
        
    },

    'attribute' : function(attr){
        emit(util.format('%s.%s', gen(attr.left),gen(attr.right)))
    },

    'funcDec' : function(func){
        makeVariable(func.name)
        var params = ""        
        for(var i = 0 ; i< func.params.length;i++){
            params += gen(func.params[i])
            if(i !== func.params.length-1){
                params += ', '
            }
        } 
        emit(func.type + ' ' + func.name +'(' + params + ')')
        emit(gen(func.block))
        emit('}')
    },

    'memberDec' : function(declaration){
        emit(declaration.access+':')
        gen(statement.block)
    },

    'methodCall' : function(method){
        emit(method.name+'(')
        var params = "" 
        for(var i = 0 ; i< method.args.length;i++){
            params += gen(method.args[i])
            if(i !== method.args.length-1){
            params += ', '
            }
        } 
        emit(');')
    },

    'printStatement' : function(statement){
        emit('cout<< ')
        var exps = "" 
        for(var i = 0 ; i< statement.exps.length;i++){
            exps += gen(statement.exps[i])+'<<'
            if(i !== statement.exps.length-1){
                exps += '<< endl;'
            } 
        }
    },

    'promptStatement' : function(statement){
        statement.exps.forEach(function (variable) {
            emit(util.format('scanf("%%d\\n", &%s);', makeVariable(variable.referent)))
        })
    },

    'returnStatement' : function(statement){
        emit(util.format('return %s;', gen(statement.exp)))
    },

    'varDec' : function(statement){
        var stmt = statement.exp.exp
        if(stmt!==''){stmt = gen(statement.exp.exp)}
        emit(util.format('%s %s %s %s;', statement.type, statement.exp.name, statement.exp.operator, stmt))
        makeVariable(statement.name)
    },

    'postfixop' : function(expression){
        return util.format('%s%s',gen(expression.exp),expression.op)
    },

    'prefixop' : function(expression){
        return util.format('%s%s',expression.op,gen(expression.exp))
    },
    
    'addop' : function(exp){
        return util.format('%s %s %s', gen(exp.left), exp.op, gen(exp.right))
    },

    'multop' : function(expression){
        return util.format('%s %s %s', gen(exp.left), exp.op, gen(exp.right))
    },

    'relop' : function(expression){
        return util.format('%s %s %s', gen(exp.left), exp.op, gen(exp.right))
    },

    'scope' : function(expression){
        return util.format('%s %s %s', gen(exp.left), exp.op, gen(exp.right))
    },

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