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
        } while (at([ 'type', 'ID', 'while', 'if', 'else', 'for', 'do', 'class', 'access']))
        return new Block(statements)
    }
    function parseStatement(){
        if (at ('int' || 'bool' || 'string' || 'double' || 'void' || 'func') ){
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
        }
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







}

























});