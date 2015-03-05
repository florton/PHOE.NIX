function scanError (line,line_num,line_pos){
        var pos = "^";
        for (var x=0; x<line_pos; x++){
            pos = "-"+pos;
        }
        var alert = "Lexical Error at: Line: " + line_num + " Char: " + line_pos;
        var error = alert + "\n" + line + "\n" + pos;
        throw error;
}


 function parseError(message, location) {
  if (location && location.line_num) {
    message = message.concat(' at line ', location.line_num)
    if (location.line_pos) {
      message = message.concat(', column ', location.line_pos)
    }
    // console.log("got here")
  } else if (location && location.path) {
    console.log("got here")
    message = message.concat(', found in ', location.path)
  }

  if (!parseError.quiet) {
      return('Error: ' + message)
  }

  error.count++
}

parseError.quiet = false

parseError.count = 0

exports.parseError = parseError

exports.scanError = scanError