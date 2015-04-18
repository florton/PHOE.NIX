function whileStatement(condition,block){
    this.condition = condition
    this.block = block
}

whileStatement.prototype.toString = function () {
    return "(while: " + this.condition.toString() + "\n" + this.block.toString() +")"
}

whileStatement.prototype.analyze = function(context){
	this.condition.analyze(context)
	this.condition.type.mustBeBoolean('Condition in "while" statement must be boolean')
    this.body.analyze(context)
}

module.exports = whileStatement