var should = require('should');
var describe = require('describe');
var scanner = require("../scanner.js").scan;
var i = require('util').inspect;

/*scanner('data/hello.nix', function (tokens) {
	console.log(tokens);
       
    
    
});
*/
(5).should.be.exactly(5).and.be.a.Number
//describe('The scanner', function () {
    //  hello.nix
    //it('scans the simplest program', function (done) {
        scanner('data/hello.nix', function (tokens) {
            tokens.length.should.equal(3)
            console.log(tokens)
            i(tokens[0]).should.equal(i({line_num:1,line_pos:0,type:'print',lexeme:'print'}))
            /*i(tokens[0]).should.equal(i({kind:'$',lexeme:'$',line:1,col:1}))
            i(tokens[1]).should.equal(i({kind:'ID',lexeme:'hello',line:1,col:3}))
            i(tokens[2]).should.equal(i({kind:'=',lexeme:'=',line:1,col:9}))
            i(tokens[3]).should.equal(i({kind:'STRLIT',lexeme:'Hello, world!',line:1,col:11}))
            i(tokens[4]).should.equal(i({kind:'say',lexeme:'say',line:2,col:1}))
            i(tokens[5]).should.equal(i({kind:'ID',lexeme:'hello',line:2,col:5}))
            i(tokens[6]).should.equal(i({kind:'EOF',lexeme:'EOF'}))
            done()*/
            //done()
        })
   // })
    //console.log(describe.getResults)
    // More its
 //})
 
 
/* describe('The scanner', function () {
    //  hello-world.ks
    it('scans the simplest program', function (done) {
        scan('test/kobra-code/good-programs/hello-world.ks', function (tokens) {
            tokens.length.should.equal(7)
            i(tokens[0]).should.equal(i({kind:'$',lexeme:'$',line:1,col:1}))
            i(tokens[1]).should.equal(i({kind:'ID',lexeme:'hello',line:1,col:3}))
            i(tokens[2]).should.equal(i({kind:'=',lexeme:'=',line:1,col:9}))
            i(tokens[3]).should.equal(i({kind:'STRLIT',lexeme:'Hello, world!',line:1,col:11}))
            i(tokens[4]).should.equal(i({kind:'say',lexeme:'say',line:2,col:1}))
            i(tokens[5]).should.equal(i({kind:'ID',lexeme:'hello',line:2,col:5}))
            i(tokens[6]).should.equal(i({kind:'EOF',lexeme:'EOF'}))
            done()
        })
    })
    // More its
 })*/
