var scanner = require("./Scanner.js").scan;
var error = require("./error.js").parseError;
var booleanLit = require("./booleanLit.js");
var stringLit = require("./string.js");
var intLit = require("./int.js");
var type = require("./type.js")
var doubleLit = require("./double.js");
var Block = require("./block.js")
var err

if (process.argv.length > 2) {
    parseFile(process.argv[2], function () {})
}

module.exports = {
    parse: function (filepath, callback) {
        parseFile(filepath, callback)
    }
}


function parseFile(file, callback) {
    scanner(file, function (tokens) {
        //main
        var statements = []
        var tokenIndex = 0
        var indents = [-1, 0]
        while (tokenIndex < tokens.length - 1) {
            if (!parseScript()) {
                console.log("\n" + err + "\n")
                callback(false)
                return
            }
        }
        console.log("you did it!")
        callback(true)

        function parseScript() {
            indentLevel()
            if (!parseStatement()) {
                if (!parseStatement()) {
                error(" Invalid token", 
                tokens[tokenIndex].line_num,
                tokens[tokenIndex].line_pos,
                tokens[tokenIndex].lexeme
                ); 
                return false
            }
            return true
        }

        function indentLevel() {
            while (at('indent')) {
                indents[1]++
            }
        }

        function parseEnd() {
            if (at('EOL')) {
                indents = [indents[1], 0]
                indentLevel()
                return true
            }
        }

        function at(type) {
            if (tokenIndex == tokens.length) {
                return
            }
            while (tokens[tokenIndex].type === 'comment' || (tokens[tokenIndex].type === 'indent' && type !== 'indent')) {
                tokenIndex++
            }
            if (type === tokens[tokenIndex].type) {
                tokenIndex++
                return true
            } else {
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

        function parseBlock() {
            if (indents[1] > indents[0]) {
                do {
                    var stmt = parseStatement()
                    if(stmt){statements.push(stmt)}
                    else{return false}
                } while (!match('EOF') || indents[1] >= indents[0])
                return new Block(statements)
            }
            return false
        }

        function parseStatement() {
            if (match('class')) {
                return parseClassDec()
            } else if (match('type')) {
                return parseType()
            } else if (at('id')) {
                if (match('assop'){
                    tokenIndex--
                    return parseAssignmentStatement()
                }
                tokenIndex--
                return parseMethodCall()
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
            var name = tokens[tokenIndex].lexeme
            var attribute
            var args = []
            at('id')
            if (at('dot')) {
                attribute = parseExp5()
            }
            if(at('(')){
                while(!at(')'))
                    args.push(parseExp())
                    if(!at('comma')){break}
                }
                return new methodCall(name, attribute, args)
            }

            return false
        }

        function parsePrintStatement() {
            at('print')
            var expressions=[]
            expressions.push(parseExp())
            if(!expressions[0]){return false}
            return new printStatement(expressions)
        }

        function parsePromptStatement() {
            at('prompt')
            var expressions=[]
            expressions.push(parseExp())
            if(!expressions[0]){return false}
            return new printStatement(expressions)
        }

        function parseReturnStatement() {
            at('return')
            var expressions=[];
            expressions.push(parseExp());
            if(!expressions[0]){return false}
            return new printStatement(expressions);
        }

        function parseMemberDeclaration() {
            var access = tokens[tokenIndex].lexeme
            at('access')
            if (parseEnd()) {
                var block = parseBlock()
                if(block){
                    return new MemberDeclaration(access,block)
                }
            }
            return false;
        }

        function parseClassDec() {
            at('class')
            var name = tokens[tokenIndex].lexeme
            at('id')
            if (parseEnd()) {
                var block = parseBlock()  
                return new ClassDec(name,block)   
            }
            return false
        }

        function parseType() {
            var varType = tokens[tokenIndex].lexeme
            at('type')
            var name = tokens[tokenIndex].lexeme
            at('id')
            if(match('(')){
                tokenIndex=-2
                return parseFunctionDec()
            }
            tokenIndex--
            var assmt = parseAssignmentStatement()
            if(parseEnd()){return new VariableDeclaration(varType,name,assmt)}
            return false
        }

        function parseFunctionDec() {
            var type = tokens[tokenIndex].lexeme
            at('type')
            var name = tokens[tokenIndex].lexeme
            at('id')
            at('(')
            var params=[]
            while(at('type')){
                params.push(tokens[tokenIndex].lexeme)
                if(!at('id')){return false}
                at('comma')
            }
            at(')')
            if (parseEnd()) {
                var block = parseBlock()
                return new Function(type,name,params,block)
            }
            return false
        }

        function parseArray() {
            if (at('[')) {
                var exps = []
                var exp
                while(!at(']')){
                    exps.push(exp)
                }
                if (match('[')) {
                    exp.push(parseArray())
                }
                return new arrayIndex(exps)
            }
            return false
        }


        function parseAssignmentStatement() {
            var names = []
            do {
                names.push(tokens[tokenIndex].lexeme)
                at('id')
                if (match('[')) {names.push(parseArray())} 
            }while(at('comma'))
            var operator = tokens[tokenIndex].lexeme
            at('assop')
            var exp
            if(!match('EOL')){exp = parseExp()}
            if (parseEnd()) {
                return new assignmentStatement(names,arrayindex,operator,exp)
            }
            return false
        }

        function parseForStatement() {
            at('for')
            var statement = parseStatement()
            at('while')
            var condition = parseExp()
            at('colon')
            var incrementer = parseStatement()
            if (parseEnd()) {
                var block = parseBlock()
                return new forStatement(statement,condition,incrementer,block)
            }
            return false
        }

        function parseWhileStatement() {
            if (at('while')) {
                var condition = parseExp()
                if(parseEnd()) {
                    var block = parseBlock()
                    return new whileStatement(condition, block);    
                }
            }
            return false
        }

        function parseIfStatement() {
            at('if')
            var condition = parseExp()
            if (parseEnd()) {
                var block = parseBlock()
                return new IfStatement(condition,block)
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
                if(parseEnd()){
                    return new doStatement(condition,block)
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
                var op = tokens[tokenIndex-1].lexeme
                var right = parseExp()
                left = new relopExp(left,op,right)
            }
            return left
        }

        function parseExp1() {
            var left=parseExp2()
                if (at('multop')) {
                    var op = tokens[tokenIndex-1].lexeme
                    var right = parseExp1()
                    left = new multopExp(left,op,right)
                }
            return left
        }

        function parseExp2() {
            var left = parseExp3()
            if (at('addop')) {
                var op = tokens[tokenIndex-1].lexeme
                var right = parseExp1()
                left = new addopExp(left,op,right)
            }
            return left
        }

        function parseExp3() {
            var left
            if(at('fixop'){
                var op = tokens[tokenIndex-1].lexeme
                left = new prefixopExp(op,parseExp4())
            } else {
                left = parseExp4()
            }
            return left
        }

        function parseExp4() {
            var left = parseExp5()
            if (at('fixop')){
                var op = tokens[tokenIndex-1].lexeme
                left = new postfixopExp(left, op)
            }
            return left
        }

        function parseExp5() {
            var left = parseExp6()
            var right = []
            if (at('dot')) {
                right.push(parseExp5())
            }
            if (match('[')) {
                right.push(parseArray())
                right.push(parseExp5())
            }
            if (at'id')) {
                if (match('(')) {
                    tokenIndex--
                    right.push(parseMethodCall())
                }else{
                    right.push(tokens[tokenIndex-1].lexeme)
                }
            }
            return new attribute(left,right)
        }

        function parseExp6() {
            var left = null
            var right = null
            if (at('scope')) {
                var op = tokens[tokenIndex-1].lexeme
                right = parseExp7()
                return new scope(left,op,right)
            }
            left = parseExp7()
            if (at('scope')) {
                var op = tokens[tokenIndex-1].lexeme
                right = parseExp7()
                return new scope(left,op,right)
            }
                return left;
            }
        }

        function parseExp7() {
            if (at('id')) {
                if (match('[')) {
                    return parseArray()
                }
                return true
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