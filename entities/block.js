var initialContext = require('../analyzer.js').initialContext
var HashMap = require('hashmap').HashMap

function Block(statements) {
  this.statements = statements
}

Block.prototype.toString = function () {
  return '(Block ' + this.statements.join('\n') + ')'
}

Block.prototype.analyze = function (context) {
  var localContext = context.createChildContext()
  this.statements.forEach(function (statement) {
    statement.analyze(localContext)
  })
}

Block.prototype.showSemanticGraph = function () {
  var tag = 0
  var seenEntities = new HashMap();

  function dump(e, tag) {
    var props = {}
    for (var p in e) {
      var value = rep(e[p])
      if (value !== undefined) props[p] = value
    }
    console.log("%d %s %j", tag, e.constructor.name, props)
  }
}

module.exports = Block