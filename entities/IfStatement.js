function ifStatement(condition,block){
    this.condition = condition
    this.block = block
}

ifStatement.prototype.toString = function () {
    return "(if: " + this.condition.toString() + "\n" + this.block.toString() +")"
}

ifStatement.prototype.analyze = function(context){
	this.condition.analyze(context)
    this.block.analyze(context)
}

module.exports = ifStatement