var scanner = require("./Scanner.js").scan;

scanner("photest.nix", function (tokens) {
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
            console.log("indent level")
            indents[1]++;
        }
    }

    function parseEnd() {
        if (at('EOL')) {
            console.log("parse end")
            indents = [indents[1], 0];
            return true;
        }
    }

    function at(type) {
        console.log(tokens[tokenIndex].type);
        while (tokens[tokenIndex].type === 'comment' || (tokens[tokenIndex].type === 'indent' && type !== 'indent')) {
            tokenIndex++;
        }
        if (type === tokens[tokenIndex].type) {
            console.log("here")
            tokenIndex++;
            return true;
        } else {
            return false;
        }
    }

    function parseBlock() {
        console.log("parse block")
        while (indents[1] >= indents[0]) {
            if (parseScript()) {
                if (indents[1] < indents[0]) {
                    return true;
                }
            }
        }
    }

    function parseStatement() {
        console.log("parse Statement")
        if (at('class')) {
            return parseClassDec()
        } else if (at('type')) {
            return parseType();
        } else if (at('id')){
            return parseAssignmentStatement();
        } else if (at('while')){
            return parseWhileStatement();
        } else if (at('if')){
            return parseIfStatement();
        } else if (at('for')){
            return parseForStatement();
        } else if (at('do')){
            return parseDoStatement();
        }  else if (at('else')){
            return parseElseStatement();
        } else {
            return parseEnd()
        }
        // else{
        //     error('no Statement', tokens[0])
        // }
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
        console.log("parse type")
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
        console.log('parse Parens')
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

    
});