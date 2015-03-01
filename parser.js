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
        while (tokens[tokenIndex].type === 'comment' || (tokens[tokenIndex].type === 'indent' && type !== 'indent')) {
            tokenIndex++;
        }
        if (tokens[tokenIndex].type === ',' && tokens[tokenIndex+1].type === 'EOL'){
            tokonIndex+=2;
        }
        if (type === tokens[tokenIndex].type) {
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
    
    function is(lexeme){
        if(lexeme === tokens[tokenIndex].lexeme){
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
        //ok heres basically where we live
        //match doesnt modify the tokens index but at advances one if it finds the token
        //so you need to recheck these matches with at within the parse functions
        //return true from your functions unless its a block in which case you need
        //to check parseEnd and parseBlock
        //otherwise call parseEnd here
        //use is method to check lexeme and move forward 1 token
        if (match('class')) {
            if(!parseClassDec()){
                return false;
            }
        } else if (match('type')) {
            return parseType();
        } else if (match('id')){
            return parseAssmt();
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
        }
        
        //not sure if this fall through works for statements with blocks
        return parseEnd()
    }

    //should be ok
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

    //possibly broken?
    function parseType() {
        if(at('type')){
            if (at('id')) {
                if (match('paren')) {
                    if(parseParens()){
                        if(at('assop')){
                            if(parseExp()){
                                return true;
                            }
                        }
                    }
                } else {
                    //might not be right
                    tokenIndex-=2;
                    return parseVarDec();
                }   
            }
        }
        return false;
    }

    //might work?
    function parseParens() {
        if (is('(')) {
            while (at('type')){
                if(at('id')){
                    if(!is(',')){break;}
                }
            }
            if(is(')')){
                return true;
            }
        }else{
            while (is('[')) {
                if(parseExp()){
                    if(!is(']'){break;}
                }  
            }
            return true;
        }
        return false;
    }

    //Should be ok hopefully?
    function parseAssmt(){
        if(match('id')){
            while(at('id')){
                if(!at(',')){break;}
            }
            if(at('assop')){
                return parseExp();
            }
            return true;
        }
        return false;
    }
    
    //should be ok
    function parseVarDec(){
        if(match('type')){
            while(at('type')){
                if(at('id')){
                    if(!at(',')){break;}
                }else{
                    return false;
                }
            }
            if(at('assop')){
                return parseExp();
            }
            return true;
        }
        return false;    
    }
    
    //use this one as a model
    //note that parse end and parse block are only called
    //because a while is followed by a block
    //otherwise let parseStatement call parseEnd
    function parseWhileStatement(){
        if(at('while')){
            if(at('id'){
                if(parseVarDec()){
                    if(at('while')){
                        if(parseExp()){
                            if(is':'){
                                if(parseExp()){
                                    if(parseEnd()){
                                        return parseBlock();
                                    }
                                }
                            }
                        }
                    }   
                }
            }
        }
        return false;
    }

    function parseIfStatement(){
        
    }

    function parseForStatement(){

    }

    function parseDoStatement(){

    }

    function parseElseStatement(){

    }

    function parseMemberDeclaration(){

    }
    
    function parseHeaderDeclaration(){
        
    }
    
    function parseExp(){

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


    
});