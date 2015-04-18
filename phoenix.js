var argv = require('yargs')
  .usage('$0 filename [-t] [-a] [-o] [-i]')
  .boolean(['t','a','o','i'])
  .describe('t', 'show tokens after scanning then stop')
  .describe('a', 'show abstract syntax tree after parsing then stop')
  .describe('o', 'do optimizations')
  .describe('i', 'generate and show the intermediate code then stop')
  .demand(1)
  .argv


var generate = require('./generator/cppgenerator')
var scan = require('./scanner').scan
var parse = require('./parser').parse
var error = require('./error')

scan(argv._[0], function (tokens) {
  if(argv.t){
    var program = tokens
    console.log(tokens)
    return
  }
})

parse(argv._[0], function (tokens) {
  var program = tokens
  
  if(argv.a){
    
    console.log(program.toString())
    return
  }

  generate(program)
  
})


