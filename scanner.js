var keywords, id,string,intLit, bool, XRegExp, byline, error, fs, scan;

fs = require('fs');

byline = require('byline');

XRegExp = require('xregexp').XRegExp;

error = require('./error');

id= XRegExp('[A-Za-z] [A-Za-z0-9_*]')

intLit=XRegExp('[0-9]+')

Double=XRegExp('intLit\.intLit')

bool=XRegex('true|false')

string=XRegExp('^[“]([^”\\]|[\\][“\\bfnrt])*[“]$')

type = /^(void|int|double|string|bool)$/;

keywords = /^(?:return|print|prompt|args|if|else|elseif|for|while|until|class|lambda|public|private|header)$/;

module.exports = function(filename, callback) {
var baseStream, linenumber, stream, tokens;
baseStream = fs.createReadStream(filename, {
encoding: 'utf8'
});
baseStream.on('error', function(err) {
return error(err);
});
stream = byline(baseStream, {
keepEmptyLines: false
});
tokens = [];
linenumber = 0;
stream.on('readable', function() {
return scan(stream.read(), ++linenumber, tokens);
});
return stream.once('end', function() {
tokens.push({
kind: 'EOF',
lexeme: 'EOF'
});
return callback(tokens);
});
};

scan = function(line, linenumber, tokens) {
var emit, pos, start, word, _ref, _results;
if (!line) {
return;
}
_ref = [0, 0], start = _ref[0], pos = _ref[1];
emit = function(kind, lexeme) {
return tokens.push({
kind: kind,
lexeme: lexeme || kind,
line: linenumber,
col: start + 1
});
};
_results = [];
while (true) {
while (/\s/.test(line[pos])) {
pos++;
}
start = pos;
if (pos >= line.length) {
break;
}
if (line[pos] === '/' && line[pos + 1] === '/') {
break;
}
if (/:=:/.test(line.substring(pos, pos + 3))) {
emit(line.substring(pos, pos + 3));
_results.push(pos += 3);
}else if (/==|+=|-=|\/=|*=|%=|++|--|:: /.test(line.substring(pos, pos + 2))) {
emit(line.substring(pos, pos + 2));
_results.push(pos += 2);
} else if (/[+\-*\/(),:=<>&%]/.test(line[pos])) {
_results.push(emit(line[pos++]));
} else if (LETTER.test(line[pos])) {
while (WORD_CHAR.test(line[pos]) && pos < line.length) {
pos++;
}
word = line.substring(start, pos);
_results.push(emit((KEYWORDS.test(word) ? word : 'ID'), word));
} else if (DIGIT.test(line[pos])) {
while (DIGIT.test(line[pos])) {
pos++;
}
_results.push(emit('INTLIT', line.substring(start, pos)));
} else {
error("Illegal character: " + line[pos], {
line: linenumber,
col: pos + 1
});
_results.push(pos++);
}
}
return _results;
};