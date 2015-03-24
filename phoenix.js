var scan = require('./scanner')
var parse = require('./parser').parse
var error = require('./error') 
parse(process.argv[2], function (tokens) { 
    var program = tokens 
    console.log(program.toString())
    return //program.analyze() 
})