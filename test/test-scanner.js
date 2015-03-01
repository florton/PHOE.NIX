// Download Mocha and should to run this file.
var should = require('should');
var scanner = require("../scanner.js").scan;
var i = require('util').inspect;


scanner("data/comments.nix", function (tokens) {
	console.log(tokens);
        /*var failed = 0;
        
        function failed(){
            failed++;
            console.log("test failed");
        }
        
        function passed(){
            console.log("test passed");
        }
        
        if(!tokens[0].type==='comment'){
           failed();
        }else{passed();}*/
    
    
});