var file = process.argv[2];
var fs = require('fs');
var error = require('./error').scanError;
var indent = /[\t]|[\s]{4}/
var comment = /[\/]{2}.*/;
var id = /[A-Za-z][A-Za-z0-9_]*/;
var intLit = /[0-9]+/;
var Double = /([0-9]+)?\.([0-9]+)/;
var bool = /true|false/;
var string = /"([^"\\]|[\\][\\bfnrt])*"/;
var type = "void|int|double|string|bool";
var keyword = /(return|print|prompt|if|else|elseif|for|while|until|do)/;
var classDec = /class/;
var access = /(public:|private:|header:)/;
var paren = /[()\[\]]/;
var equals = /[=]{2,3}/;
var assop = /:=:|=|\+=|-=|\/=|\*=|%=/;
var addop = /\+|-/;
var fixop = /\+\+|--/;
var multop = /\/|%|\*{1,2}/;
var relop = /==|<=|>=|>|<|&{1,2}|!=|\|{1,2}/;
var scope = /::/;
var colon = /:/;
var dot = /\./;
var comma = /,/;
var space = /^\s/;
var line_num = 1;
var line_pos = 0;
var tokens = [];
// allows to be run individually with filepath as the first arg
if (process.argv.length > 2) {
    readFile(file, function(arr) {
       console.log(arr);
    });
}
//call back necessary since fs.readFile is async 
module.exports = {
    scan: function(filepath, callback) {
        readFile(filepath, callback);
    }
};

function readFile(file, callback) {
    fs.readFile(file, {
        encoding: 'utf-8'
    }, function(err, data) {
        if (err) throw err;
        var array_of_lines = data.split("\n");
        line_num = 1;
        tokens = [];
        for (line in array_of_lines) {
            if (!(/^\s+$/g.test(array_of_lines[line]))) {
                getTokens(array_of_lines[line] + '');
                addToken(line_num, array_of_lines[line].length, "EOL", "\n");
            }
            line_num++;
        }
        callback(tokens);
    });
}

function getTokens(line) {
    var indents = true;
    line_pos = 0;
    while (true) {
        if (!isToken("indent", indent, line)) {
            break;
        }
    }
    while (line_pos < line.length) {
        if (isToken("comment", comment, line)) {                   
        } else if (isToken("type", new RegExp(type), line)) { 
        } else if (isToken("string", string, line)) {          
        } else if (isToken("bool", bool, line)) {           
        } else if (isToken("double", Double, line)) {
        } else if (isToken("$", keyword, line)) {  
        } else if (isToken("int", intLit, line)) {                     
        } else if (isToken("$", paren, line)) {   
        } else if (isToken("relop", equals, line)) {   
        } else if (isToken("assop", assop, line)) {      
        } else if (isToken("relop", relop, line)) {            
        } else if (isToken("multop", multop, line)) {   
        } else if (isToken("fixop", fixop, line)) {  
        } else if (isToken("addop", addop, line)) {
        } else if (isToken("scope", scope, line)) {
        } else if (isToken("colon", colon, line)) {
        } else if (isToken("dot", dot, line)) {
        } else if (isToken("comma", comma, line)) {
        } else if (isToken("access", access, line)) { 
        } else if (isToken("access", access, line)) {
        } else if (isToken("class", classDec, line)) {
            while(space.test(line.substring(line_pos))){line_pos++;}
            if (isToken("id", id, line)){
                type+="|"+tokens[tokens.length-1].lexeme;
            }
        } else if (isToken("id", id, line)) { 
        } else {
            //add more microsyntax lines here if needed
            //if the next char isn't a space it brings up the error dialogue
            if (space.test(line.substring(line_pos))) {
                while(space.test(line.substring(line_pos))){line_pos++;}
            } else {
                error(line, line_num, line_pos);
            }
        }
    }
}

function addToken(line_num, line_pos, type, lexeme) {
    var token = {
        line_num: line_num,
        line_pos: line_pos,
        type: type,
        lexeme: lexeme
    };
    tokens.push(token);
}

function isToken(type, regex, line) {
    var match = regex.exec(line.substring(line_pos));
    if (match !== null && match.index == 0) {
        if (type == "$") {
            type = match[0];
        }
        addToken(line_num, line_pos, type, match[0]);
        line_pos += match[0].length;
        return true;
    } else {
        return false;
    }
}
