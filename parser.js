var scanner = require("./Scanner.js").scan;

if (process.argv.length > 2) {
    parseFile(process.argv[2]);
}

module.exports = {
    parse: function(filepath) {
        parseFile(filepath);
    }
};


function parseFile(file){
    
    scanner(file, function (tokens) {
        //main
        var tokenIndex = 0;
        var indents = [0, 0];

        while (tokenIndex < tokens.length - 1) {
            parseScript();
        }

        function parseScript() {
            indentLevel();
            if (!parseStatement()) {
                throw "error";
            }
            //success?
        }

        function indentLevel() {
            console.log("indent level");            
            while (at('indent')) {
                indents[1]++;
            }
        }

        function parseEnd() {
            console.log("parse end");
            if (at('EOL')) {
                indents = [indents[1], 0];
                indentLevel();
                return true;
            }
        }

        function at(type) {

            while (tokens[tokenIndex].type === 'comment' || (tokens[tokenIndex].type === 'indent' && type !== 'indent')) {
                tokenIndex++;
            }
            if (type === tokens[tokenIndex].type) {
                console.log(tokens[tokenIndex].type);
                console.log(tokens[tokenIndex].lexeme);
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
            return (indents[1] >= indents[0]);
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
                    if (match('(')) {
                        return parseFunctionDec();
                    }
                    if (match('[')) {
                        if(parseArray()){
                            return parseEnd();
                        }   
                    }
                    else {
                        //might not be right
                        tokenIndex--;
                        return parseAssignmentStatement();
                    }   
                }
            }
            return false;
        }

        function parseFunctionDec() {
            console.log("Parse Function Dec");
            if (at('(')) {
                while (at('type')){
                    if(at('id')){
                        if(!at('comma')){break;}
                    }
                }
                if(at(')')){
                    if (parseEnd()){
                        return parseBlock();
                    }
                }
            }
            return false;
        }
        
        function parseArray(){
            if (at('[')){
                if (parseExp()){
                    if(at(']')){
                        if(match('[')){
                            return parseArray();
                        }
                        return true;
                    }
                }
            }
            return false;
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
            console.log("exp");
            if(parseExp1()){
                if(at('relop')){
                    return parseExp();
                }
                return true;
            }
            return false;
        }
     
        function parseExp1(){
            console.log("exp1");
            if(parseExp2()){
                if(at('mulop')){
                    return parseExp1();
                }
                return true;
            }
            return false;
        }
     
        function parseExp2(){
            console.log("exp2");
            if(parseExp3()){
                if(at('addop')){
                    return parseExp2();
                }
                return true;
            }
            return false;
        }
     
        function parseExp3(){
            console.log("exp3");
            at('fixop');
            return parseExp4();
        }
     
        function parseExp4(){
            console.log("exp4");
            if(parseExp5()){
                at('fixop');
                return true;
            }
            return false;
        }
     
        function parseExp5(){
            console.log("exp5");
            if(parseExp6()){
                return parseExp5Helper();
            }
        }
        
        function parseExp5Helper(){
            if(at('dot')){
                if(at('id')){
                    return parseExp5Helper();
                }
                return false;
            }
            if(match('[')){
                if(!parseArray()){return false;}
                return parseExp5Helper();
            }
            if(at('(')){
                while (parseExp()){
                    if(!at('comma')){break;}
                }
                if(at(')')){
                    return parseExp5Helper();
                }
                return false;
            }
            return true;
        }
        
        function parseExp6(){
            console.log("exp6");
            if(parseExp7()){
                if (at('scope')){
                    return parseExp7();
                }
                return true;
            }
            if (at('scope')){
                    return parseExp7();
            }
            return false;
        }
        
        function parseExp7(){
            console.log("exp7");
            if(at('id')){
                if(match('[')){
                    if(!parseArray()){return false;}
                }
                return true;
            }
            else if (at('int')){return true;}
            else if (at('string')){return true;}
            else if (at('bool')){return true;}
            else if (at('double')){return true;}
            return false;
        }


        
    });

}
