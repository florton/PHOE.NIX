var should = require('should');
var parser = require("../parser.js").parse;
var i = require('util').inspect;

describe('Hello World', function(){
    it('should save without error', function(done){
      parser('test/data/hello.nix', function(stuff) {done();});
    });
});

describe('Variable Declarations', function(){
    it('should save without error', function(done){
      parser('test/data/variables.nix', function(stuff) {done();});
    });
});

describe('For Loop', function(){
    it('should save without error', function(done){
      parser('test/data/for.nix', function(stuff) {done();});
    });
});

describe('While Loop', function(){
    it('should save without error', function(done){
      parser('test/data/while.nix', function(stuff) {done();});
    });
});

describe('Arrays', function(){
    it('should save without error', function(done){
      parser('test/data/arrays.nix', function(stuff) {done();});
    });
});

describe('Functions', function(){
    it('should save without error', function(done){
      parser('test/data/function.nix', function(stuff) {done();});
    });
});

describe('Member Declarations', function(){
    it('should save without error', function(done){
      parser('test/data/public.nix', function(stuff) {done();});
    });
});

describe('Broken Hello World', function(){
    it('should throw error', function(done){
      parser('test/data/broken/hello.nix', done());
    });
});

describe('Broken Variable Declarations', function(){
    it('should throw error', function(done){
      parser('test/data/broken/variables.nix', done());
    });
});

describe('Broken For Loop', function(){
    it('should throw error', function(done){
      parser('test/data/broken/for.nix', done());
    });
});

describe('Broken While Loop', function(){
    it('should throw error', function(done){
      parser('test/data/broken/while.nix', done());
    });
});

