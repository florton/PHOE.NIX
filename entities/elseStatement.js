function elseStatement(block){
    this.block = block
}

elseStatement.prototype.toString = function () {
    return "(else: " + "\n" + this.block.toString() + ")"
}

elseStatement.prototype.analyze = function(context){
    this.body.analyze(context)
}

module.exports = elseStatement