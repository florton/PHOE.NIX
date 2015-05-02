var util = require('util')
var HashMap = require('hashmap').HashMap

module.exports = function (program) {
  gen(program) 
  console.log('#include <iostream>')
  console.log('#include <stdio.h>')
  console.log('#include <string>')
  console.log('using namespace std;')
  console.log(globals)
  console.log(functions)
  console.log(main)
}

var indentPadding = 4
var indentLevel = 0

var functions = ""
var main = ""
var globals = ""
var inGlobal = false
var inClass = false
var inFunc = false

function emit(line) {
    var pad = indentPadding * indentLevel
    if(inGlobal){
        globals += line + "\n"
    }else if (inFunc&&!inClass){
        functions += Array(pad-4).join(' ') + line + "\n"
    }else{
        main += Array(pad+1).join(' ') + line + "\n"
    }
}

function gen(node){
    //console.log(node.constructor.name)
    //console.log(node)
    return generator[node.constructor.name](node)
}

function makeVariable(variable) {
    var lastId = 0
    var map = new HashMap()
    if (!map.has(variable)){map.set(variable, ++lastId)}  
}

var generator = {
    
    'script': function (program) {
        emit('int main(int argc, char** argv) {')
        gen(program.block)
        indentLevel++
        emit('return 0;')
        indentLevel--
        emit('}')
    },
    
    'Block': function (block) {
        indentLevel++
        block.statements.forEach(function (block) {
            gen(block)
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
        gen(statement.block)
        emit('}')
    },
    
    'breakStatement': function (statement){
        emit('break;')
    },

    'doStatement' : function (statement) {
        emit('do {')
        gen(statement.block)
        emit('} while('+ gen(statement.condition) +');')
    },

    'ifStatement' : function (statement) {
        emit('if('+ gen(statement.condition) +') {')
        gen(statement.block)
        emit('}')
    },

    'forStatement' : function (forStatement) {
        emit('for('+ gen(forStatement.statement) + '; ' + gen(forStatement.condition)+'; '+gen(forStatement.incrementer)+') {')
        gen(forStatement.block)
        emit('}')
    },

    'classDec' : function (declaration) {
        inClass = true
        emit('class '+ gen(declaration.name) +'{')
        makeVariable(gen(declaration.name))
        gen(declaration.block)
        emit('};')
        inClass = false
    },

    'elseStatement' : function (statement) {
        if(statement.block.constructor.name !== "ifStatement"){  
            emit('else {')
            gen(statement.block)
            emit('}')
        }else{
            emit('else ')
            gen(statement.block)        
        }       
    },

    'arrayIndex' : function(arrayIndex){
        var index = ""        
        for(var i = 0 ; i< arrayIndex.exps.length;i++){
            index += '[' + gen(arrayIndex.exps[i]) + ']'
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
        if (attr.right.constructor.name === 'attribute'||attr.right.constructor.name === 'varRef'){divider = '.'}
        return util.format('%s%s%s', gen(attr.left),divider, gen(attr.right))
    },

    'funcDec' : function(func){
        makeVariable(func.name)
        var params = ""        
        for(var i = 0 ; i< func.params.length;i++){
            params += func.params[i].type + " " + gen(func.params[i].name)
            if(i !== func.params.length-1){
                params += ', '
            }
        }
        inFunc = true
        emit("inline "+func.type + " " + gen(func.name) + '(' + params + ')' +'{')
        gen(func.block)
        emit('}')
        inFunc = false
    },

    'memberDec' : function(declaration){
        if(declaration.access!=="global"){
            emit(declaration.access+':')
        }else{inGlobal = true}    
        
            gen(declaration.block)
        inGlobal = false
    },

    'methodCall' : function(method){   
        var params = "" 
        for(var i = 0 ; i< method.args.length;i++){
            params += gen(method.args[i])
            if(i !== method.args.length-1){
            params += ', '
            }
        } 
        if(arguments.callee.caller.caller.toString().substring(10,15)!=='block'){return gen(gen(method.name)+'(' + params + ')')}
        emit(gen(method.name)+'(' + params + ');')
    },

    'printStatement' : function(statement){
        var output = ''
        statement.exps.forEach(function (exp) {
            if(exp.constructor.name=='addop'){
                if((exp.left.constructor.name == 'intLit' && exp.right.constructor.name == 'intLit')||(exp.left.constructor.name == 'doubleLit' && exp.right.constructor.name == 'doubleLit')){
                    output+= gen(exp.left) + exp.op + gen(exp.right) + " << "
                }else{
                    output+= gen(exp.left) + " << " + gen(exp.right) + " << "
                }     
            }else{
                output += gen(exp) + " << "
            }
        })
        emit("cout << " + output + "endl;")
    },

    'promptStatement' : function(statement){
        emit("getline(cin, " + gen(statement.exp) + ");")
        makeVariable(gen(statement.exp))
    },

    'returnStatement' : function(statement){
        emit(util.format('return %s;', gen(statement.exp)))
    },

    'varDec' : function(statement){
        var type = statement.type
        var stmt = statement.exp.exp
        if(stmt!==''){stmt = gen(statement.exp.exp)} 
        if(statement.exp.name.constructor.name ==='attribute'){
            if(statement.exp.name.right.constructor.name ==='arrayIndex'){
                type = "static "+type
            }
        }
        var varDec = util.format('%s %s %s %s;', type, gen(statement.exp.name), statement.exp.operator, stmt)
        if(arguments.callee.caller.caller.toString().substring(10,22)==='forStatement'){return varDec}
        emit(varDec)
        makeVariable(statement.name)
    },
    
    'varRef' : function(reference){
        return reference.token
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