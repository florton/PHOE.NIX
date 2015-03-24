var argv = require('yargs')
  .usage('$0 [-t] [-a]')
  .boolean(['t','a'])
  .describe('t', 'show tokens after scanning then stop')
  .describe('a', 'show abstract syntax tree after parsing then stop')
  .demand(1)
  .argv

var scan = require('./scanner')
var parse = require('./parser').parse
var error = require('./error')

parse(argv._[0], function (tokens) {
  var program = tokens
    console.log(program.toString())
    return
  //program.analyze()
})