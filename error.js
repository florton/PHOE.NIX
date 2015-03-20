function scanError (line,line_num,line_pos){
        var pos = "^";
        for (var x=0; x<line_pos; x++){
            pos = "-"+pos;
        }
        var alert = "Lexical Error at: Line: " + line_num + " Char: " + line_pos;
        var error = alert + "\n" + line + "\n" + pos;
        throw error;
}


function parseError(message, line_num, line_pos, lexeme) {
    throw message + " at line " + line_num + ", column " + line_pos + " token is '" + lexeme + "'"
}


exports.parseError = parseError

exports.scanError = scanError