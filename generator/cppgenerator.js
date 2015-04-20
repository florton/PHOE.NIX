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
    //console.log(node.constructor.name)
    //console.log(node)
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
        var assignment = util.format('%s %s %s', gen(statement.name), statement.operator, gen(statement.exp))
        if(arguments.callee.caller.caller.toString().substring(10,22)==='forStatement'){return assignment}
        emit(assignment+';')
    },

    'whileStatement': function (statement) {
        emit('while (' + gen(statement.condition) + ') {')
        gen(statement.block);
        emit('}')
    },

    'doStatement' : function (statement) {
        emit('do {')
        gen(statement.block);
        emit('} while('+ gen(statement.condition) +');')
    },

    'ifStatement' : function (statement) {
        emit('if('+ gen(statement.condition) +') {')
        gen(statement.block);
        emit('}')
    },

    'forStatement' : function (forStatement) {
        emit('for('+ gen(forStatement.statement) + ' ' + gen(forStatement.condition)+'; '+gen(forStatement.incrementer)+') {')
        gen(forStatement.block);
        emit('}')
    },

    'classDec' : function (declaration) {
        emit('class '+ declaration.name +'{')
        makeVariable(declaration.name)
        gen(declaration.block);
        emit('}')
    },

    'elseStatement' : function (statement) {
        emit('else {')
        gen(statement.block);
        emit('}')
    },

    'arrayIndex' : function(arrayIndex){
        var index = ""        
        for(var i = 0 ; i< arrayIndex.exps.length;i++){
            index += '[' + arrayIndex.exps[i] + ']'
        }
        return index
    },
    
    'arrayLit' : function(array){
        var list = ""        
        for(var i = 0 ; i< array.exps.length;i++){
            list += gen(array.exps[i])
            if(i !== array.exps.length-1){
                list += ', '
            }
        }
        return '{'+list+'}'
    },

    'attribute' : function(attr){
        var divider = ''
        if (attr.right.constructor.name === 'attribute'||attr.right.constructor.name === 'String'){divider = '.'}
        return util.format('%s%s%s', gen(attr.left),divider, gen(attr.right))
    },

    'funcDec' : function(func){
        makeVariable(func.name)
        var params = ""        
        for(var i = 0 ; i< func.params.length;i++){
            params += func.params[i].type + " " + func.params[i].name
            if(i !== func.params.length-1){
                params += ', '
            }
        } 
        emit(func.type + ' ' + func.name +'(' + params + ') {')
        gen(func.block)
        emit('}')
    },

    'memberDec' : function(declaration){
        emit(declaration.access+':')
        gen(declaration.block)
    },

    'methodCall' : function(method){
        
        var params = "" 
        for(var i = 0 ; i< method.args.length;i++){
            params += gen(method.args[i])
            if(i !== method.args.length-1){
            params += ', '
            }
        } 
        emit(gen(method.name)+'(' + params + ');')
    },

    'printStatement' : function(statement){
        statement.exps.forEach(function (exp) {
            emit(util.format('printf("%%d\\n", %s);', gen(exp)))
        })
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
        var varDec = util.format('%s %s %s %s;', statement.type, gen(statement.exp.name), statement.exp.operator, stmt)
        if(arguments.callee.caller.caller.toString().substring(10,22)==='forStatement'){return varDec}
        emit(varDec)
        makeVariable(statement.name)
    },

    'postfixop' : function(exp){
        return util.format('%s%s',gen(exp.exp),exp.op)
    },

    'prefixop' : function(exp){
        return util.format('%s%s',exp.op,gen(exp.exp))
    },
    
    'addop' : function(exp){
        return util.format('%s %s %s', gen(exp.left), exp.op, gen(exp.right))
    },

    'multop' : function(exp){
        return util.format('%s %s %s', gen(exp.left), exp.op, gen(exp.right))
    },

    'relop' : function(exp){
        return util.format('%s %s %s', gen(exp.left), exp.op, gen(exp.right))
    },

    'scope' : function(exp){
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
    }, 
    
    'String' : function (literal) {
        return literal.toString()
    } 
}