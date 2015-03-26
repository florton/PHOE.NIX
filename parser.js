var scanner = require("./Scanner.js").scan
var error = require("./error.js").parseError
var booleanLit = require("./entities/booleanLit.js")
var stringLit = require("./entities/string.js")
var intLit = require("./entities/int.js")
var type = require("./entities/type.js")
var doubleLit = require("./entities/double.js")
var Block = require("./entities/block.js")
var methodCall = require("./entities/methodCall.js")
var attribute = require("./entities/attribute.js")
var arrayIndex = require("./entities/arrayIndex.js")
var assignmentStatement = require("./entities/assignmentStatement.js")
var relopExp = require("./entities/relop.js")
var prefixopExp = require("./entities/prefixop.js")
var postfixopExp = require("./entities/postfixop.js")
var printStatement = require("./entities/printStatement.js")
var IfStatement = require("./entities/IfStatement.js")
var forStatement = require("./entities/forStatement.js")
var multopExp = require("./entities/multop.js")
var addopExp = require("./entities/addop.js")
var VariableDeclaration = require("./entities/variableDeclaration.js")
var elseStatement = require("./entities/elseStatement.js")
var whileStatement = require("./entities/whileStatement.js")
var functionDeclaration = require("./entities/functionDeclaration.js")
var promptStatement = require("./entities/promptStatement.js")
var returnStatement = require("./entities/returnStatement.js")
var Script = require("./entities/script.js")
var MemberDeclaration = require("./entities/MemberDeclaration.js")
var scope = require("./entities/scope.js")
var doStatement = require("./entities/doStatement.js")
var classDec = require("./entities/classDec.js")

if (process.argv.length > 2) {
    parseFile(process.argv[2], function() {})
}

module.exports = {
    parse: function(filepath, callback) {
        parseFile(filepath, callback)
    }
}


function parseFile(file, callback) {
    scanner(file, function(tokens) {
        var tokenIndex = 0
        var indents = [0, 0]
        main()
        
        function main(){    
            while (tokenIndex < tokens.length - 1) {
                var script = parseScript()
                if (!script) {
                    callback(false)
                }
            }
            callback(script.toString())
        }

        function parseScript() {
            var block = []
            do {
                var stmt = parseStatement()
                if (stmt) {
                    if(stmt!==true)block.push(stmt)
                }else{
                    error(" Invalid token",
                    tokens[tokenIndex].line_num,
                    tokens[tokenIndex].line_pos,
                    tokens[tokenIndex].lexeme)
                    return false
                }
            } while (!at('EOF'))

            return new Block(block)
        }

        function parseBlock() {
            var statements = []
            if (indents[1] > indents[0]) {
                do {
                    var stmt = parseStatement()
                    if (stmt) {
                        if(stmt!==true)statements.push(stmt)
                    }else {return false}
                } while (!match('EOF') && indents[1] >= indents[0])
                return new Block(statements)
            }
            return false
        }

        function indentLevel() {
            while (at('indent')) {
                indents[1]++
            }
        }

        function parseEnd() {
            if (at('EOL')) {
                if(!match('EOF')){
                    indents = [indents[1], 0]
                    indentLevel()
                    
                }
                return true
            }
            return false
        }

        function at(type) {
            if (tokenIndex == tokens.length) {
                return
            }
            while (tokens[tokenIndex].type === 'comment' || (tokens[tokenIndex].type === 'indent' && type !== 'indent' && type !== 'EOF')) {
                tokenIndex++
            }
            if (type === tokens[tokenIndex].type) {
                //console.log("found: " + tokens[tokenIndex].type + " " + tokens[tokenIndex].lexeme)
                tokenIndex++
                return true
            } else {
                //console.log("->"+type)
                return false
            }
        }

        function match(type) {
            if (at(type)) {
                tokenIndex--
                return true
            } else {
                return false
            }
        }

        function parseStatement() {
            if (match('class')) {
                return parseClassDec()
            } else if (match('type')) {
                return parseType()
            } else if (match('id')) {
                var stmt = parseMethodCall()
                if(parseEnd()){return stmt}
            } else if (match('while')) {
                return parseWhileStatement()
            } else if (match('if')) {
                return parseIfStatement()
            } else if (match('for')) {
                return parseForStatement()
            } else if (match('do')) {
                return parseDoStatement()
            } else if (match('else')) {
                return parseElseStatement()
            } else if (match('access')) {
                return parseMemberDeclaration()
            } else if (match('print')) {
                return parsePrintStatement()
            } else if (match('prompt')) {
                return parsePromptStatement()
            } else if (match('return')) {
                return parseReturnStatement()
            } else {
                return parseEnd()
            }
        }

        function parseMethodCall() {
            var startIndex = tokenIndex
            var args = []       
            var names=parseAtttribute()
            if (at('(')) {
                while (at('comma') || !at(')')) {
                    if (at('comma')) {
                        args.push('')
                        continue
                    }
                    args.push(parseExp())
                }
                return new methodCall(names, args)
            }
            tokenIndex = startIndex
            return parseAssignmentStatement()
        }

        function parseAtttribute(){
            var names =[]
            var name = (tokens[tokenIndex].lexeme)
            at('id')
            if (at('dot')){
                names.push(new attribute(name, parseAtttribute()))
            } else if (match('[')) {
                names.push(new attribute(name, parseArray()))
                if(at('dot')){
                    names.push(new attribute(name, parseAtttribute()))
                }
            } else {names.push(name)}
            return names
        }
        
        function parsePrintStatement() {
            at('print')
            var expressions = []
            expressions.push(parseExp())
            if (!expressions[0]) {
                return false
            }
            parseEnd()
            return new printStatement(expressions)
        }

        function parsePromptStatement() {
            at('prompt')
            var expressions = []
            expressions.push(parseExp())
            if (!expressions[0]) {
                return false
            }
            parseEnd()
            return new promptStatement(expressions)
        }

        function parseReturnStatement() {
            at('return')
            var expressions = []
            expressions.push(parseExp())
            if (!expressions[0]) {
                return false
            }
            if(parseEnd()){
                return new returnStatement(expressions)
            }
            return false
        }

        function parseMemberDeclaration() {
            var access = tokens[tokenIndex].lexeme
            at('access')
            if (parseEnd()) {
                var block = parseBlock()
                if (block) {
                    return new MemberDeclaration(access, block)
                }
            }
            return false
        }

        function parseClassDec() {
            at('class')
            var name = tokens[tokenIndex].lexeme
            at('id')
            if (parseEnd()) {
                var block = parseBlock()
                return new classDec(name, block)
            }
            return false
        }

        function parseType() {
            var varType = tokens[tokenIndex].lexeme
            at('type')
            var name = tokens[tokenIndex].lexeme
            at('id')
            if (match('(')) {
                tokenIndex -= 2
                return parseFunctionDec()
            }
            tokenIndex--
            var assmt = parseAssignmentStatement()
            if(!assmt){return false}
            return new VariableDeclaration(varType, name, assmt)
        }

        function parseFunctionDec() {
            var type = tokens[tokenIndex].lexeme
            at('type')
            var name = tokens[tokenIndex].lexeme
            at('id')
            at('(')
            var params = []
            while (at('type')) {
                params.push(tokens[tokenIndex].lexeme)
                if (!at('id')) {
                    return false
                }
                at('comma')
            }
            at(')')
            if (parseEnd()) {
                var block = parseBlock()
                return new functionDeclaration(type, name, params, block)
            }
            return false
        }

        function parseArray() {
            if (at('[')) {
                var exps = []
                while (at('comma') || !at(']')) {
                    if (at('comma')) {
                        exps.push('')
                        continue
                    }
                    exps.push(parseExp())
                }
                if (match('[')) {
                    exps.push(parseArray())
                }
                return new arrayIndex(exps)
            }
            return false
        }

        function parseAssignmentStatement() {
            var names = []
            do {
                names.push(parseAtttribute())
            } while (at('comma'))

            var operator = tokens[tokenIndex].lexeme
            var exp
            if(at('assop')){
                if (!match('EOL')) {exp = parseExp()} 
                if (!exp){return false}
            }else if(at('fixop')||exp===undefined){exp = ''}                  
            return new assignmentStatement(names, operator, exp)
        }

        function parseForStatement() {
            at('for')
            if(match('type')){var statement = parseType()}
            else {var statement = parseAssignmentStatement()}
            at('while')
            var condition = parseExp()
            if (!at('colon')) {return false}
            var incrementer = parseAssignmentStatement()
            parseEnd()
            var block = parseBlock()
            return new forStatement(statement, condition, incrementer, block)
        }

        function parseWhileStatement() {
            if (at('while')) {
                var condition = parseExp()
                if (parseEnd()) {
                    var block = parseBlock()
                    return new whileStatement(condition, block)
                }
            }
            return false
        }

        function parseIfStatement() {
            at('if')
            var condition = parseExp()
            if (parseEnd()) {
                var block = parseBlock()
                return new IfStatement(condition, block)
            }
            return false
        }

        function parseDoStatement() {
            at('do')
            if (parseEnd()) {
                var block = parseBlock()
                while (!match('while')) {
                    parseStatement()
                }
                at('while')
                var condition = parseExp()
                if (parseEnd()) {
                    return new doStatement(condition, block)
                }
            }
            return false
        }

        function parseElseStatement() {
            at('else')
            if (parseEnd()) {
                var block = parseBlock()
                return new elseStatement(block)
            }
            if (match('if')) {
                return parseIfStatement()
            }
            return false
        }

        function parseExp() {
            var left = parseExp1()
            if (at('relop')) {
                var op = tokens[tokenIndex - 1].lexeme
                var right = parseExp()
                left = new relopExp(left, op, right)
            }
            return left
        }

        function parseExp1() {
            var left = parseExp2()
            if (at('multop')) {
                var op = tokens[tokenIndex - 1].lexeme
                var right = parseExp1()
                left = new multopExp(left, op, right)
            }
            return left
        }

        function parseExp2() {
            var left = parseExp3()
            if (at('addop')) {
                var op = tokens[tokenIndex - 1].lexeme
                var right = parseExp1()
                left = new addopExp(left, op, right)
            }
            return left
        }

        function parseExp3() {
            var left
            if (at('fixop')) {
                var op = tokens[tokenIndex - 1].lexeme
                left = new prefixopExp(op, parseExp4())
            } else {
                left = parseExp4()
            }
            return left
        }

        function parseExp4() {
            var left = parseExp5()
            if (at('fixop')) {
                var op = tokens[tokenIndex - 1].lexeme
                left = new postfixopExp(left, op)
            }
            return left
        }

        function parseExp5() {
            var left = parseExp6()
            var right = ''
            if (at('dot')) {
                right = new attribute(right,parseExp5())
            } else if (match('[')) {
                right = parseArray()
                right = new attribute(right,parseExp5())
            } else if (match('(')) {
                tokenIndex--
                right = parseMethodCall()
                return new attribute(right, parseExp5())
            }
            if(right!=''){left = attribute(left, right)}
            return left
        }

        function parseExp6() {
            var left
            var right
            if (at('scope')) {
                var op = tokens[tokenIndex - 1].lexeme
                right = parseExp7()
                return new scope(left, op, right)
            }
            left = parseExp7()
            if (at('scope')) {
                var op = tokens[tokenIndex - 1].lexeme
                right = parseExp7()
                return new scope(left, op, right)
            }
            return left
        }

        function parseExp7() {
            var name = tokens[tokenIndex].lexeme
            if (at('id')) {
                if (match('[')) {
                    return new attribute(name, parseArray())
                }
                return name
            }
            if (match('[')) {
                return parseArray()
            } else if (at('double')) {
                return new doubleLit(tokens[tokenIndex - 1].lexeme)
            } else if (at('int')) {
                return new intLit(tokens[tokenIndex - 1].lexeme)
            } else if (at('string')) {
                return new stringLit(tokens[tokenIndex - 1].lexeme)
            } else if (at('bool')) {
                return new booleanLit(tokens[tokenIndex - 1].lexeme)
            }
            return false
        }

    })
}