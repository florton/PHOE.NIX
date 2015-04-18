function doStatement(condition,block){
	this.condition = condition
	this.block = block 
}

doStatement.prototype.toString = function(){
	return "(do: " + "\n" + this.block.toString() + "\n" + "while: " + this.condition.toString()+")"
}

doStatement.prototype.analyze = function(context){
	this.condition.analyze(context)
	this.condition.type.mustBeBoolean('Condition in "do" statement must be boolean')
    this.body.analyze(context)
}

module.exports = doStatement