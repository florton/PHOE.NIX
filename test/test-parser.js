var should = require('should');
var parser = require("../parser.js").parse;
var i = require('util').inspect;

var tests = 0;

parser('data/hello.nix', function (bool) {
    if(bool) console.log("hello.nix passed");
});

parser('data/for.nix', function (bool) {
    if(bool) console.log("for.nix passed");
});

parser('data/variables.nix', function (bool) {
    if(bool) console.log("variables.nix passed");
});

parser('data/while.nix', function (bool) {
    if(bool) console.log("while.nix passed");
});

parser('data/broken/hello.nix', function (bool) {
    if(!bool) console.log("broken version hello.nix failed");
});

parser('data/broken/for.nix', function (bool) {
    if(!bool) console.log("broken version for.nix failed");
});

parser('data/broken/variables.nix', function (bool) {
    if(!bool) console.log("broken version variables.nix failed");
});

parser('data/broken/while.nix', function (bool) {
    if(!bool) console.log("broken version while.nix failed");
});