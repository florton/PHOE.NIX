var should = require('should');
var parser = require("../parser.js").parse;
var i = require('util').inspect;

//parser('data/hello.nix');
console.log();
console.log();
console.log();
console.log();
console.log();
parser('data/for.nix');
parser('data/variables.nix');
parser('data/while.nix');