var should = require('should');
var scanner = require("../scanner.js").scan;
var i = require('util').inspect;

describe('Scan Tests', function() {
    context('Hello World', function() {
        it('should scan without error', function(done) {
            scanner('./test/data/hello.nix', function (tokens) {
                tokens.length.should.equal(4);
                i(tokens[0]).should.equal(i({line_num:1,line_pos:0,type:'print',lexeme:'print'}));
                i(tokens[1]).should.equal(i({line_num:1,line_pos:6,type:'string',lexeme:'"hello world"'}));
                i(tokens[2]).should.equal(i({ line_num: 1, line_pos: 19, type: 'EOL', lexeme: '\n' }));
                // EOF also needed
                done();
            });
        });
    });

    context('Comments', function() {
        it('should scan without error', function(done) {
            scanner('./test/data/comments.nix', function (tokens) {
                tokens.length.should.equal(22);
                i(tokens[0]).should.equal(i({ line_num: 1, line_pos: 0,type: 'comment',lexeme: '//comments' }));
                i(tokens[1]).should.equal(i({ line_num: 1, line_pos: 11, type: 'EOL', lexeme: '\n' }));
                i(tokens[2]).should.equal(i({ line_num: 2, line_pos: 0, type: 'type', lexeme: 'int' }));
                i(tokens[3]).should.equal(i({ line_num: 2, line_pos: 4, type: 'id', lexeme: 'z' }));
                i(tokens[4]).should.equal(i({ line_num: 2, line_pos: 6, type: 'assop', lexeme: '=' }));
                i(tokens[5]).should.equal(i({ line_num: 2, line_pos: 8, type: 'int', lexeme: '5' }));
                i(tokens[6]).should.equal(i({ line_num: 2, line_pos: 10, type: 'EOL', lexeme: '\n' }));
                i(tokens[7]).should.equal(i({ line_num: 3, line_pos: 0, type: 'comment', lexeme: '// int x' }));
                i(tokens[8]).should.equal(i({ line_num: 3, line_pos: 9, type: 'EOL', lexeme: '\n' }));
                i(tokens[9]).should.equal(i({ line_num: 4, line_pos: 0, type: 'type', lexeme: 'int' }));
                i(tokens[10]).should.equal(i({ line_num: 4, line_pos: 4, type: 'id', lexeme: 'y' }));
                i(tokens[11]).should.equal(i({ line_num: 4, line_pos: 6, type: 'assop', lexeme: '=' }));
                i(tokens[12]).should.equal(i({ line_num: 4, line_pos: 8, type: 'int', lexeme: '5' }));
                i(tokens[13]).should.equal(i({ line_num: 4, line_pos: 10, type: 'comment', lexeme: '// word' }));
                i(tokens[14]).should.equal(i({ line_num: 4, line_pos: 18, type: 'EOL', lexeme: '\n' }));
                i(tokens[15]).should.equal(i({ line_num: 5, line_pos: 0, type: 'type', lexeme: 'double' }));
                i(tokens[16]).should.equal(i({ line_num: 5, line_pos: 7, type: 'id', lexeme: 'x' }));
                i(tokens[17]).should.equal(i({ line_num: 5, line_pos: 9, type: 'assop', lexeme: '=' }));
                i(tokens[18]).should.equal(i({ line_num: 5, line_pos: 11, type: 'double', lexeme: '20.0' }));
                i(tokens[19]).should.equal(i({ line_num: 5,line_pos: 16,type: 'comment',lexeme: '// int z = 28' }));
                i(tokens[20]).should.equal(i({ line_num: 5, line_pos: 29, type: 'EOL', lexeme: '\n' }));
                // EOF also needed
                done();
            });
        });
    });


    context('Variables', function() {
        it('should scan without error', function(done) {
            scanner('./test/data/variables.nix', function (tokens) {
                tokens.length.should.equal(67);
                i(tokens[0]).should.equal(i({ line_num: 1, line_pos: 0, type: 'type', lexeme: 'int' }));
                i(tokens[1]).should.equal(i({ line_num: 1, line_pos: 4, type: 'id', lexeme: 'x' }));
                i(tokens[2]).should.equal(i({ line_num: 1, line_pos: 6, type: 'EOL', lexeme: '\n' }));
                i(tokens[3]).should.equal(i({ line_num: 2, line_pos: 0, type: 'type', lexeme: 'int' }));
                i(tokens[4]).should.equal(i({ line_num: 2, line_pos: 4, type: 'id', lexeme: 'y' }));
                i(tokens[5]).should.equal(i({ line_num: 2, line_pos: 5, type: 'comma', lexeme: ',' }));
                i(tokens[6]).should.equal(i({ line_num: 2, line_pos: 6, type: 'id', lexeme: 'p' }));
                i(tokens[7]).should.equal(i({ line_num: 2, line_pos: 8, type: 'EOL', lexeme: '\n' }));
                i(tokens[8]).should.equal(i({ line_num: 3, line_pos: 0, type: 'type', lexeme: 'double' }));
                i(tokens[9]).should.equal(i({ line_num: 3, line_pos: 7, type: 'id', lexeme: 'a' }));
                i(tokens[10]).should.equal(i({ line_num: 3, line_pos: 8, type: 'comma', lexeme: ',' }));
                i(tokens[11]).should.equal(i({ line_num: 3, line_pos: 9, type: 'id', lexeme: 'b' }));
                i(tokens[12]).should.equal(i({ line_num: 3, line_pos: 10, type: 'comma', lexeme: ',' }));
                i(tokens[13]).should.equal(i({ line_num: 3, line_pos: 11, type: 'id', lexeme: 'c' }));
                i(tokens[14]).should.equal(i({ line_num: 3, line_pos: 12, type: 'comma', lexeme: ',' }));
                i(tokens[15]).should.equal(i({ line_num: 3, line_pos: 13, type: 'id', lexeme: 'e' }));
                i(tokens[16]).should.equal(i({ line_num: 3, line_pos: 15, type: 'EOL', lexeme: '\n' }));
                i(tokens[17]).should.equal(i({ line_num: 4, line_pos: 0, type: 'type', lexeme: 'int' }));
                i(tokens[18]).should.equal(i({ line_num: 4, line_pos: 4, type: 'id', lexeme: 'z' }));
                i(tokens[19]).should.equal(i({ line_num: 4, line_pos: 6, type: 'assop', lexeme: '=' }));
                i(tokens[20]).should.equal(i({ line_num: 4, line_pos: 8, type: 'int', lexeme: '5004' }));
                i(tokens[21]).should.equal(i({ line_num: 4, line_pos: 13, type: 'EOL', lexeme: '\n' }));
                i(tokens[22]).should.equal(i({ line_num: 5, line_pos: 0, type: 'type', lexeme: 'double' }));
                i(tokens[23]).should.equal(i({ line_num: 5, line_pos: 7, type: 'id', lexeme: 'd' }));
                i(tokens[24]).should.equal(i({ line_num: 5, line_pos: 9, type: 'assop', lexeme: '=' }));
                i(tokens[25]).should.equal(i({ line_num: 5, line_pos: 11, type: 'double', lexeme: '10.432' }));
                i(tokens[26]).should.equal(i({ line_num: 5, line_pos: 18, type: 'EOL', lexeme: '\n' }));
                i(tokens[27]).should.equal(i({ line_num: 6, line_pos: 0, type: 'type', lexeme: 'string' }));
                i(tokens[28]).should.equal(i({ line_num: 6, line_pos: 7, type: 'id', lexeme: 's' }));
                i(tokens[29]).should.equal(i({ line_num: 6, line_pos: 9, type: 'assop', lexeme: '=' }));
                i(tokens[30]).should.equal(i({ line_num: 6, line_pos: 11, type: 'string', lexeme: '"Hello"' }));
                i(tokens[31]).should.equal(i({ line_num: 6, line_pos: 19, type: 'EOL', lexeme: '\n' }));
                i(tokens[32]).should.equal(i({ line_num: 7, line_pos: 0, type: 'type', lexeme: 'bool' }));
                i(tokens[33]).should.equal(i({ line_num: 7, line_pos: 5, type: 'id', lexeme: 't' }));
                i(tokens[34]).should.equal(i({ line_num: 7, line_pos: 7, type: 'assop', lexeme: '=' }));
                i(tokens[35]).should.equal(i({ line_num: 7, line_pos: 9, type: 'bool', lexeme: 'true' }));
                i(tokens[36]).should.equal(i({ line_num: 7, line_pos: 14, type: 'EOL', lexeme: '\n' }));
                i(tokens[37]).should.equal(i({ line_num: 8, line_pos: 0, type: 'type', lexeme: 'bool' }));
                i(tokens[38]).should.equal(i({ line_num: 8, line_pos: 5, type: 'id', lexeme: 'f' }));
                i(tokens[39]).should.equal(i({ line_num: 8, line_pos: 7, type: 'assop', lexeme: '=' }));
                i(tokens[40]).should.equal(i({ line_num: 8, line_pos: 9, type: 'bool', lexeme: 'false' }));
                i(tokens[41]).should.equal(i({ line_num: 8, line_pos: 16, type: 'EOL', lexeme: '\n' }));
                i(tokens[42]).should.equal(i({ line_num: 9, line_pos: 0, type: 'type', lexeme: 'string' }));
                i(tokens[43]).should.equal(i({ line_num: 9, line_pos: 7, type: 'id', lexeme: 'str' }));
                i(tokens[44]).should.equal(i({ line_num: 9, line_pos: 11, type: 'assop', lexeme: '=' }));
                i(tokens[45]).should.equal(i({ line_num: 9,line_pos: 13,type: 'string',lexeme: '"First part of the string"' }));
                i(tokens[46]).should.equal(i({ line_num: 9, line_pos: 40, type: 'addop', lexeme: '+' }));
                i(tokens[47]).should.equal(i({ line_num: 9,line_pos: 42,type: 'string',lexeme: '"second part of the string"' }));
                i(tokens[48]).should.equal(i({ line_num: 9, line_pos: 70, type: 'EOL', lexeme: '\n' }));
                i(tokens[49]).should.equal(i({ line_num: 10, line_pos: 0, type: 'type', lexeme: 'int' }));
                i(tokens[50]).should.equal(i({ line_num: 10, line_pos: 4, type: 'id', lexeme: 'thing' }));
                i(tokens[51]).should.equal(i({ line_num: 10, line_pos: 10, type: 'EOL', lexeme: '\n' }));
                i(tokens[52]).should.equal(i({ line_num: 11, line_pos: 0, type: 'id', lexeme: 'x' }));
                i(tokens[53]).should.equal(i({ line_num: 11, line_pos: 1, type: 'comma', lexeme: ',' }));
                i(tokens[54]).should.equal(i({ line_num: 11, line_pos: 2, type: 'id', lexeme: 'thing' }));
                i(tokens[55]).should.equal(i({ line_num: 11, line_pos: 8, type: 'assop', lexeme: '=' }));
                i(tokens[56]).should.equal(i({ line_num: 11, line_pos: 10, type: 'int', lexeme: '5' }));
                i(tokens[57]).should.equal(i({ line_num: 11, line_pos: 12, type: 'EOL', lexeme: '\n' }));
                i(tokens[58]).should.equal(i({ line_num: 12, line_pos: 0, type: 'id', lexeme: 'y' }));
                i(tokens[59]).should.equal(i({ line_num: 12, line_pos: 2, type: 'assop', lexeme: '=' }));
                i(tokens[60]).should.equal(i({ line_num: 12, line_pos: 4, type: 'int', lexeme: '20' }));
                i(tokens[61]).should.equal(i({ line_num: 12, line_pos: 7, type: 'EOL', lexeme: '\n' }));
                i(tokens[62]).should.equal(i({ line_num: 13, line_pos: 0, type: 'id', lexeme: 'p' }));
                i(tokens[63]).should.equal(i({ line_num: 13, line_pos: 2, type: 'assop', lexeme: '=' }));
                i(tokens[64]).should.equal(i({ line_num: 13, line_pos: 4, type: 'int', lexeme: '29' }));
                i(tokens[65]).should.equal(i({ line_num: 13, line_pos: 6, type: 'EOL', lexeme: '\n' }));
                // EOF also needed
                done();
            });
        });
    });

    context('Arrays', function() {
        it('should scan without error', function(done) {
            scanner('./test/data/arrays.nix', function (tokens) {
                tokens.length.should.equal(186);
                i(tokens[2]).should.equal(i({ line_num: 1, line_pos: 5, type: '[', lexeme: '[' }));
                i(tokens[3]).should.equal(i({ line_num: 1, line_pos: 6, type: 'int', lexeme: '6' }));
                i(tokens[4]).should.equal(i({ line_num: 1, line_pos: 7, type: ']', lexeme: ']' }));
                i(tokens[12]).should.equal(i({ line_num: 2, line_pos: 11, type: '[', lexeme: '[' }));
                i(tokens[13]).should.equal(i({ line_num: 2, line_pos: 12, type: 'int', lexeme: '1' }));
                i(tokens[14]).should.equal(i({ line_num: 2, line_pos: 13, type: 'comma', lexeme: ',' }));
                i(tokens[15]).should.equal(i({ line_num: 2, line_pos: 14, type: 'int', lexeme: '2' }));
                i(tokens[16]).should.equal(i({ line_num: 2, line_pos: 15, type: 'comma', lexeme: ',' }));
                i(tokens[17]).should.equal(i({ line_num: 2, line_pos: 16, type: 'int', lexeme: '3' }));
                i(tokens[18]).should.equal(i({ line_num: 2, line_pos: 17, type: 'comma', lexeme: ',' }));
                i(tokens[19]).should.equal(i({ line_num: 2, line_pos: 18, type: 'int', lexeme: '4' }));
                i(tokens[20]).should.equal(i({ line_num: 2, line_pos: 19, type: ']', lexeme: ']' }));
                i(tokens[58]).should.equal(i({ line_num: 7, line_pos: 7, type: 'id', lexeme: 'st' }));
                i(tokens[59]).should.equal(i({ line_num: 7, line_pos: 9, type: '[', lexeme: '[' }));
                i(tokens[60]).should.equal(i({ line_num: 7, line_pos: 10, type: 'int', lexeme: '3' }));
                i(tokens[61]).should.equal(i({ line_num: 7, line_pos: 11, type: ']', lexeme: ']' }));
                i(tokens[62]).should.equal(i({ line_num: 7, line_pos: 12, type: '[', lexeme: '[' }));
                i(tokens[63]).should.equal(i({ line_num: 7, line_pos: 13, type: 'int', lexeme: '2' }));
                i(tokens[64]).should.equal(i({ line_num: 7, line_pos: 14, type: ']', lexeme: ']' }));
                i(tokens[74]).should.equal(i({ line_num: 8, line_pos: 9, type: 'string', lexeme: '"99"' }));
                i(tokens[97]).should.equal(i({ line_num: 11, line_pos: 4, type: '[', lexeme: '[' }));
                i(tokens[98]).should.equal(i( {line_num: 11, line_pos: 5, type: '[', lexeme: '[' }));
                i(tokens[99]).should.equal(i({ line_num: 11, line_pos: 6, type: 'string', lexeme: '"10"' }));
                i(tokens[100]).should.equal(i({ line_num: 11, line_pos: 10, type: 'comma', lexeme: ',' }));
                i(tokens[101]).should.equal(i({ line_num: 11,line_pos: 11,type: 'string',lexeme: '"here you go"' }));
                i(tokens[102]).should.equal(i({ line_num: 11, line_pos: 24, type: ']', lexeme: ']' }));
                i(tokens[103]).should.equal(i({ line_num: 11, line_pos: 25, type: 'comma', lexeme: ',' }));
                i(tokens[104]).should.equal(i({ line_num: 11, line_pos: 26, type: '[', lexeme: '[' }));
                i(tokens[105]).should.equal(i({ line_num: 11, line_pos: 27, type: 'string', lexeme: '"pi"' }));
                i(tokens[106]).should.equal(i({ line_num: 11, line_pos: 31, type: 'comma', lexeme: ',' }));
                i(tokens[107]).should.equal(i({ line_num: 11,line_pos: 32,type: 'string',lexeme: '"chicken"' }));
                i(tokens[108]).should.equal(i({ line_num: 11, line_pos: 41, type: ']', lexeme: ']' }));
                i(tokens[109]).should.equal(i({ line_num: 11, line_pos: 42, type: ']', lexeme: ']' }));
                // EOF also needed
                done();
            });
        });
    });

    context('Conditionals', function() {
        it('should scan without error', function(done) {
            scanner('./test/data/conditionals.nix', function (tokens) {
                tokens.length.should.equal(12);
                i(tokens[0]).should.equal(i({ line_num: 1, line_pos: 0, type: 'relop', lexeme: '==' }));
                i(tokens[1]).should.equal(i({ line_num: 1, line_pos: 3, type: 'relop', lexeme: '>' }));
                i(tokens[2]).should.equal(i({ line_num: 1, line_pos: 5, type: 'relop', lexeme: '<' }));
                i(tokens[3]).should.equal(i({ line_num: 1, line_pos: 7, type: 'relop', lexeme: '<=' }));
                i(tokens[4]).should.equal(i({ line_num: 1, line_pos: 10, type: 'relop', lexeme: '>=' }));
                i(tokens[5]).should.equal(i({ line_num: 1, line_pos: 13, type: 'relop', lexeme: '&' }));
                i(tokens[6]).should.equal(i({ line_num: 1, line_pos: 15, type: 'relop', lexeme: '&&' }));
                i(tokens[7]).should.equal(i({ line_num: 1, line_pos: 18, type: 'relop', lexeme: '!=' }));
                i(tokens[8]).should.equal(i({ line_num: 1, line_pos: 21, type: 'relop', lexeme: '|' }));
                i(tokens[9]).should.equal(i({ line_num: 1, line_pos: 23, type: 'relop', lexeme: '||' }));
                i(tokens[10]).should.equal(i({ line_num: 1, line_pos: 25, type: 'EOL', lexeme: '\n' }));
                // EOF also needed
                done();
            });
        });
    });

});