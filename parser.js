var scanner = require("./Scanner.js").scan;
var error = require("./error.js").parseError;
var booleanLit = require("./booleanLit.js");
var stringLit = require("./string.js");
var intLit = require("./int.js");
var type = require("./type.js")
var doubleLit = require("./double.js");
var Block = require("./block.js")



if (process.argv.length > 2) {
    parseFile(process.argv[2], function () {console.log("woohoo")});
}

module.exports = {
    parse: function (filepath, callback) {
        parseFile(filepath, callback);
    }
};


function parseFile(file, callback) {
    scanner(file, function (tokens) {
        //main
        var statements = [];
        var tokenIndex = 0;
        var indents = [-1, 0];
        while (tokenIndex < tokens.length - 1) {
            if(!parseScript()){
                console.log(error);
                callback(false);
                return;
            }
        }
        callback(true);

        function parseScript() {
            indentLevel();
            if (!parseStatement()) {
                error(" Invalid token", {line_num: tokens[tokenIndex].line_num, line_pos: tokens[tokenIndex].line_pos});
            }
            return parseBlock();
        }

        function indentLevel() {
            while (at('indent')) {
                indents[1]++;
            }
        }

        function parseEnd() {
            if (at('EOL')) {
                indents = [indents[1], 0];
                indentLevel();
                return true;
            }
        }

        function at(type) {
            if(tokenIndex === tokens.length){ return;}
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

        function match(type) {
            if (at(type)) {
                tokenIndex--;
                return true;
            } else {
                return false;
            }
        }

        function parseBlock() {
            console.log("new Block")
            if(indents[1] > indents[0]){
                do{
                    statements.push(parseStatement())
                }while(!match('EOF'))
                return new Block(statements);
            }
            return false;
        }

        function parseStatement() {
            if (match('class')) {
                return parseClassDec();
            } else if (match('type')) {
                return parseType();
            } else if (match('id')) {
                if (parseMethodCall()) {
                    return true;
                } else {
                    return parseAssignmentStatement();
                }
            } else if (match('while')) {
                return parseWhileStatement();
            } else if (match('if')) {
                return parseIfStatement();
            } else if (match('for')) {
                return parseForStatement();
            } else if (match('do')) {
                return parseDoStatement();
            } else if (match('else')) {
                return parseElseStatement();
            } else if (match('access')) {
                return parseMemberDeclaration();
            } else if (match('print')) {
                return parsePrintStatement();
            } else if (match('prompt')) {
                return parsePromptStatement();
            } else if (match('return')) {
                return parseReturnStatement();
            } else {
                return parseEnd();
            }
        }

        function parseMethodCall() {
            if (at('id')) {
                if(at('dot')){
                    parseExp();
                }
                if (at('(')) {
                    while (parseExp()) {
                        if (!at('comma')) {
                            break;
                        }
                    }
                    if (at(')')) {
                        return true;
                    }
                }
            }
            error(" Invalid Method Call", {line_num: tokens[tokenIndex].line_num, line_pos: tokens[tokenIndex].line_pos});
        }

        function parsePrintStatement() {
            if (at('print')) {
                return parseExp();
            }
            error(" Invalid Print Statement", {line_num: tokens[tokenIndex].line_num, line_pos: tokens[tokenIndex].line_pos});
        }

        function parsePromptStatement() {
            if (at('prompt')) {
                return parseExp();
            }
            error(" Invalid Prompt Statement", {line_num: tokens[tokenIndex].line_num, line_pos: tokens[tokenIndex].line_pos});
        }

        function parseReturnStatement() {
            //console.log("parse return");
            if (at('return')) {
                return parseExp();
            }
            error(" Invalid Return Statement", {line_num: tokens[tokenIndex].line_num, line_pos: tokens[tokenIndex].line_pos});
        }

        function parseMemberDeclaration() {
            if (at('access')) {
                if (parseEnd()) {
                    return parseBlock();
                }
            }
        }

        function parseClassDec() {
            if (at('class')) {
                if (at('id')) {
                    if (parseEnd()) {
                        return parseBlock();
                    }
                }
            }
            error(" Invalid Class Declaration", {line_num: tokens[tokenIndex].line_num, line_pos: tokens[tokenIndex].line_pos});
        }

        function parseType() {
            if (at('type')) {
                if (match('id')) {
                    if (parseExp()) {
                        return parseAssignmentStatement();
                    }
                }
            }
            error(" Invalid Type", {line_num: tokens[tokenIndex].line_num, line_pos: tokens[tokenIndex].line_pos});
        }

        function parseFunctionDec() {
            if (at('(')) {
                while (at('type')) {
                    if (at('id')) {
                        if (!at('comma')) {
                            break;
                        }
                    }
                }
                if (at(')')) {
                    if (parseEnd()) {
                        return parseBlock();
                    }
                }
            }
            error(" Invalid Function Declaration", {line_num: tokens[tokenIndex].line_num, line_pos: tokens[tokenIndex].line_pos});
        }

        function parseArray() {
            if (at('[')) {
                if (parseExp()) {
                    while (at('comma')) {
                        if (!parseExp()) {
                            return false;
                        }
                    }
                    if (at(']')) {
                        if (match('[')) {
                            return parseArray();
                        }
                        return true;
                    }
                }
            }
            error(" Invalid Array", {line_num: tokens[tokenIndex].line_num, line_pos: tokens[tokenIndex].line_pos});
        }


        function parseAssignmentStatement() {
            if (parseEnd()) {
                return true;
            }
            if (at('fixop')) {
                return true;
            }

            if (match('[')) {
                if (!parseArray()) {
                    return false;
                }
            } else if (at('comma')) {
                if (at('id')) {
                    return parseAssignmentStatement();
                }
            }
            if (at('assop')) {
                return parseExp();
            }
            error(" Invalid Assignment Statement", {line_num: tokens[tokenIndex].line_num, line_pos: tokens[tokenIndex].line_pos});
        }

        function parseForStatement() {
            if (at('for')) {
                if (parseStatement()) {
                    if (at('while')) {
                        if (parseExp()) {
                            if (at('colon')) {
                                if (parseStatement()) {
                                    if (parseEnd()) {
                                        return parseBlock();
                                    }
                                }
                            }
                        }
                    }
                }
            }
            error(" Invalid For Statement", {line_num: tokens[tokenIndex].line_num, line_pos: tokens[tokenIndex].line_pos});
        }

        function parseWhileStatement() {
            if (at('while')) {
                if (parseExp()) {
                    if (parseEnd()) {
                        return parseBlock();
                    }
                }
            }
            error(" Invalid While Statement", {line_num: tokens[tokenIndex].line_num, line_pos: tokens[tokenIndex].line_pos});
        }

        function parseIfStatement() {
            if (at('if')) {
                if (parseExp()) {
                    if (parseEnd()) {
                        return parseBlock();
                    }
                }
            }
            error(" Invalid If Statement", {line_num: tokens[tokenIndex].line_num, line_pos: tokens[tokenIndex].line_pos});
        }

        function parseDoStatement() {
            if (at('do')) {
                if (parseEnd()) {
                    if (parseBlock()) {
                        while (!match('while')){
                            parseStatement()
                        }
                        if(at('while')){
                            if (parseExp()){
                                return parseEnd();
                            } 
                        }     
                    }
                }
            }
            error(" Invalid Do Statement", {line_num: tokens[tokenIndex].line_num, line_pos: tokens[tokenIndex].line_pos});
        }
        

        function parseElseStatement() {
            if (at('else')) {
                if (parseEnd()) {
                    return parseBlock();
                }
                if (match('if')) {
                    return parseIfStatement();
                }
            }
            error(" Invalid Else Statement", {line_num: tokens[tokenIndex].line_num, line_pos: tokens[tokenIndex].line_pos});
        }


        function parseExp() {
            if (parseExp1()) {
                if (at('relop')) {
                    return parseExp();
                }
                return true;
            }
            return false;
        }

        function parseExp1() {
            if (parseExp2()) {
                if (at('multop')) {
                    return parseExp1();
                }
                return true;
            }
            return false;
        }

        function parseExp2() {
            if (parseExp3()) {
                if (at('addop')) {
                    return parseExp2();
                }
                return true;
            }
            return false;
        }

        function parseExp3() {
            at('fixop');
            return parseExp4();
        }

        function parseExp4() {
            if (parseExp5()) {
                at('fixop');
                return true;
            }
            return false;
        }

        function parseExp5() {
            if (parseExp6()) {
                return parseExp5Helper();
            }
        }

        function parseExp5Helper() {
            if (at('dot')) {
                if (at('id')) {
                    return parseExp5Helper();
                }
                return false;
            }
            if (match('[')) {
                if (!parseArray()) {
                    return false;
                }
                return parseExp5Helper();
            }
            if (at('(')) {
                at('type');
                while (parseExp()) {
                    if (!at('comma')) {
                        break;
                    }
                    at('type');
                }
                if (at(')')) {
                    return parseExp5Helper();
                }
                return false;
            }
            return true;
        }

        function parseExp6() {
            if (parseExp7()) {
                if (at('scope')) {
                    return parseExp7();
                }
                return true;
            }
            if (at('scope')) {
                return parseExp7();
            }
            return false;
        }

        function parseExp7() {
            if (at('id')) {
                if (match('[')) {
                    return parseArray();
                }
                return true;
            }
            if (match('[')) {
                return parseArray();
            } else if (at('double')) {
                return new doubleLit(tokens[tokenIndex - 1].lexeme);
            } else if (at('int')) {
                return new intLit(tokens[tokenIndex - 1].lexeme);
            } else if (at('string')) {
                return new stringLit(tokens[tokenIndex - 1].lexeme)
            } else if (at('bool')) {
                return new booleanLit(tokens[tokenIndex - 1].lexeme);
            }
            return false;
        }

    });
}