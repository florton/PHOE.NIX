function whileStatement(condition,block){
    this.condition = condition
    this.block = block
}

whileStatement.prototype.toString = function () {
    return "(while: " + this.condition.toString() + "\n" + this.block.toString() +")"
}

whileStatement.prototype.analyze = function(context){
	this.condition.analyze(context)
    this.block.analyze(context)
}

module.exports = whileStatement