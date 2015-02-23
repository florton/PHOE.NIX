var scanner = require("./scanner.js").scan;

scanner("photest.txt", function (tokens) {
    //main
    var tokenIndex = 0;
    var indents = [0, 0];

    while (tokenIndex < token.length - 1) {
        parseScript();
    }

    function parseScript() {
        indentlevel();
        if (!parseStatement()) {
            //error
        }
        //success?
    }

    function indentLevel() {
        var indent = 0;
        if (at('indent')) {
            indents[1]++;
            indentLevel();
        }
    }

    function parseEnd() {
        if (at('EOL')) {
            indents = [indents[1], 0];
            return true;
        }
    }

    function at(type) {
        while (tokens[tokenIndex].type === 'comment' || (tokens[tokenIndex].type === 'indent' && type === 'indent')) {
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
            if (parseClass()) {}
        }
        if (at('type')) {
            return parseType();
        }
        if (at('id')) {}
        if (at('for')) {}
        if (at('do')) {}
        if (at('while')) {}
        if (at('if')) {}
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
                return parseParens(token[tokenIndex - 1].lexeme);
            } else {
                return //parseAssmt();}
            }
            return false;
        }
    }

    function parseParens(paren) {
        if (paren === "(") { 
            //function
        }
        if (paren === ")") {
            //array
        }   
    }
    
});