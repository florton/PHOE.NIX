var should = require('should');
var parser = require("../parser.js").parse;
var i = require('util').inspect;

var tests = 0;

    parser('data/hello.nix', function (bool) {
        if(bool) console.log("hello.nix passed");
    });
    //if(parser('data/for.nix')){console.log("for.nix passed");}
    //try{parser('data/variables.nix');}catch(error){console.log("variables.nix passed");}
    //if(parser('data/while.nix')){console.log("while.nix passed");}

