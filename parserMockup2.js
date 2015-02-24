var scanner = require("./scanner.js").scan;
 
scanner("photest.txt", function (tokens) {
    //main
    var tokenIndex = 0;
    var indents = [0, 0];
 
    while (tokenIndex < tokens.length - 1) {
        parseScript();
    }
 
    function parseScript() {
        indentLevel();
        if (!parseStatement()) {
            //error
        }
        //success?
    }
 
    function indentLevel() {
        while (at('indent')) {
            indents[1]++;
        }
    }
 
    function parseEnd() {
        if (at('EOL')) {
            indents = [indents[1], 0];
            return true;
        }
    }
 
    function at(type) {
        while (tokens[tokenIndex].type === 'comment' || (tokens[tokenIndex].type === 'indent' && type !== 'indent')) {
            tokenIndex++;
        }
        if (type === tokens[tokenIndex].type) {
            tokenIndex++;
            return true;
        } else {
            return false;
        }
    }
 
    function parseBlock() {
        while (indents[1] >= indents[0]) {
            if (parseScript()) {
                if (indents[1] < indents[0]) {
                    return true;
                }
            }
        }
    }
 
    function parseStatement() {
        if (at('class')) {
            return parseClassDec()
        } else if (at('type')) {
            return parseType();
        }else if ('id'){
            return parseAssignmentStatement();
        } else if ('while'){
            return parseWhileStatement();
        } else if ('if'){
            return parseIfStatement();
        } else if ('for'){
            return parseForStatement();
        } else if ('do'){
            return parseDoStatement();
        } else if ('public' || 'private'){
            return parseMemberDeclaration();
        } else if ('else'){
            return parseElseStatement();
        } else{
            error('no Statement', tokens[0])
        }
    }
 
    function parseClassDec() {
        if (at('id')) {
            if (parseEnd()) {
                if (parseBlock()) {
                    return true;
                }
            }
        }
        return false;
    }
 
    function parseType() {
        if (at('id')) {
            if (at('paren')) {
                return parseParens(tokens[tokenIndex - 1].lexeme);
            } else {
                return //parseAssmt();
            }  
        }
        return false;
    }
 
    function parseParens(paren) {
        if (paren === "(") {
            //function
            //parseParams()
        }
        if (paren === "[") {
            //array
            //exp4 or exp1 ?
        }  
    }
 
    function parseAssignmentStatement(){
       
    }
   
});