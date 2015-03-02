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

    function match(type){
        if(at(type)){
            tokenIndex--;
            return true;
        }else{
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
        return false;
    }

    function parseStatement() {
        console.log("parse Statement")
        if (match('class')) {
            return parseClassDec()
        } else if (match('type')) {
            return parseType();
        } else if (match('id')){
            return parseAssignmentStatement();
        } else if (match('while')){
            return parseWhileStatement();
        } else if (match('if')){
            return parseIfStatement();
        } else if (match('for')){
            return parseForStatement();
        } else if (match('do')){
            return parseDoStatement();
        }  else if (match('else')){
            return parseElseStatement();
        } else {
            return parseEnd()
        }
        // else{
        //     error('no Statement', tokens[0])
        // }
    }

    function parseClassDec() {
        if(at('class')){
            if (at('id')) {
                if (parseEnd()) {
                    return parseBlock();
                }
            }
        }
        return false;
    }

    function parseType() {
        console.log("parse TYPE");
        if(at('type')){
            if (at('id')) {
                if (match('(')||match('[')) {
                    if(parseParens()){
                        return parseAssignmentStatement();
                    }

                } else {
                    //might not be right
                    tokenIndex--;
                    return parseAssignmentStatement();
                }   
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
        if(match('id')){
            while(at('id')){
                if(!at('comma')){break;}
            }
            if(at('assop')){
                return parseExp();
            }
            return true;
        }
        return false;
    }

    function parseForStatement(){
        console.log("For Statement");
        if(at('for')){
                if(parseStatement()){
                    if(at('while')){
                        if(parseExp()){
                            if(at('colon')){
                                if(parseStatement()){
                                    if(parseEnd()){
                                        return parseBlock();
                                    }
                                }
                            }
                        }
                    }   
                }
        }
        return false;
    }

    function parseWhileStatement(){
        if(at('while')){
            if(parseExp()){
                if(parseEnd()){
                    return parseBlock();
                }
            }
        }
        return false;
    }

    function parseIfStatement(){
        if(at('if')){
            if(parseExp()){
                if(parseEnd()){
                    return parseBlock();
                }
            }
        }
        return false;
    }

    function parseDoStatement(){
        if(at('do')){
            if(parseEnd()){
                if(parseBlock()){
                    return parseWhileStatement();
                }
            }
        }
        return false;
    }

    function parseElseStatement(){
        if(at('else')){
            if(parseEnd()){
                return parseBlock();
            }
            if(match('if')){
                return parseIfStatement();
            }
        }
        return false;
    }

    function parseMemberDeclaration(){

    }

    function parseExp(){
        if(parseExp1()){
            if(at('relop')){
                return parseExp();
            }
            return true;
        }
        return false;
    }
 
    function parseExp1(){
        if(parseExp2()){
            if(at('mulop')){
                return parseExp1();
            }
            return true;
        }
        return false;
    }
 
    function parseExp2(){
        if(parseExp3()){
            if(at('addop')){
                return parseExp2();
            }
            return true;
        }
        return false;
    }
 
    function parseExp3(){
        at('fixop');
        return parseExp4();
    }
 
    function parseExp4(){
        if(parseExp5()){
            at('fixop');
            return true;
        }
        return false;
    }
 
    function parseExp5(){
        if(at('id')){
            if (at('scope')){
                return parseExp5();
            }
            return true;
        }
        return false;
    }

    function parseExp6(){

    }

    function parseExp7(){

    }


    
});