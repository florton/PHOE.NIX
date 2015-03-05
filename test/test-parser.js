var should = require('should');
var parser = require("../parser.js").parse;
var i = require('util').inspect;
(5).should.be.exactly(5).and.be.a.Number

console.log(parser('data/hello.nix'));