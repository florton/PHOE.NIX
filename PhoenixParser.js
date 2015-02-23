var scanner = require("./scanner.js").scan;
scanner("photest.txt", function (tokens) {
    module.exports = function (){
    	var script = scriptParse()
    	match("EOF");
    	return script
    }
    function parseBlock() {
        var statements = []
        do {
            statements.push(parseStatement())
            match('EOL')
        } while (at([ 'int', 'bool', 'string', 'double', 'void', 'func', 'ID', 'while', 'if', 'else', 'for', 'do', 'class', 'public', 'private']))
        return new Block(statements)
    }
    function parseStatement(){
        if (at ('int' || 'bool' || 'string' || 'double' || 'void') ){
        	return parseType();
        } else if ('ID'){
        	return parseAssignmentStatement();
        } else if ('while'){
        	return parseWhileStatement();
        } else if ('if'){
        	return parseIfStatement();
        } else if ('for'){
        	return parseForStatement();
        } else if ('do'){
        	return parseDoStatement();
        } else if ('class'){
        	return parseClassDeclaration();
        } else if ('public' || 'private'){
        	return parseMemberDeclaration();
        } else if ('else'){
        	return parseElseStatement();
        } else if ('func'){
        	return parseLambdaFunction();
        } else{
        	error('no Statement', tokens[0])
        }
    }

    function parseType(){

    }

    function parseAssignmentStatement(){

    }

    function parseWhileStatement(){
    	// match('while');
     //    var condition = parseExpression();
     //    var body = parseBlock();
     //    return new WhileStatement(condition, body);
    }

    function parseIfStatement(){

    }

    function parseForStatement(){

    }

    function parseDoStatement(){

    }

    function parseClassDeclaration(){

    }

    function parseElseStatement(){

    }

    function parseMemberDeclaration(){

    }

    function parseLambdaFunction(){

    }

    function parseExp1(){

    }

    function parseExp2(){

    }

    function parseExp3(){

    }

    function parseExp4(){

    }

    function parseExp5(){

    }

    function parseExp6(){

    }

    function parseExp7(){

    }

    function parseExp8(){

    }

    function at(kind) {
        if (tokens.length === 0) {
            return false
        } else if (Array.isArray(type)) {
            return type.some(at)
        } else {
            return type === tokens[0].type
        }  
    }

   function match(kind) {
        if (tokens.length === 0) {
            error('Unexpected end of source program')
        } else if (type === undefined || type === tokens[0].type) {
            return tokens.shift()
        } else {
            error('Expected ' + type + ' but found ' + tokens[0].type, tokens[0])
        }
    }
});