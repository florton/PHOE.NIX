var initialContext = require('../analyzer.js').initialContext
var HashMap = require('hashmap').HashMap

function script(block){
    this.block = block
}

script.prototype.toString = function () {
    return this.block.toString()
}

script.prototype.showSemanticGraph = function () {
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

module.exports = script