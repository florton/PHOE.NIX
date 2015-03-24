var initialContext = require('../analyzer.js').initialContext

function script(block){
    this.block = block
}

script.prototype.toString = function () {
    return "(script"+this.block.toString() + ")"
}

module.exports = script