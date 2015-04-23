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
    var error = message + " at line " + line_num + ", column " + (line_pos + 1) + " token is '" + lexeme + "'"
    throw new Error(error);
}


function analyzeError(error){
	throw new Error(error);
}


exports.parseError = parseError

exports.scanError = scanError

exports.analyzeError = analyzeError