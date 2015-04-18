var initialContext = require('../analyzer.js').initialContext
var HashMap = require('hashmap').HashMap

function script(block){
    this.block = block
}

script.prototype.toString = function () {
    return "(script: "+this.block.toString() + ")"
}

script.prototype.analyze = function () {
  this.block.analyze(initialContext())
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

  function rep(e) {
    if (/undefined|function/.test(typeof e)) {
      return undefined
    } else if (/number|string|boolean/.test(typeof e)) {
      return e
    } else if (Array.isArray(e)) {
      return e.map(rep)
    } else if (e.kind) {
      return e.lexeme
    } else {
      if (!seenEntities.has(e)) {
        seenEntities.set(e, ++tag)
        dump(e, tag)
      }
      return seenEntities.get(e)
    }
  }

  dump(this, 0)
}


module.exports = script