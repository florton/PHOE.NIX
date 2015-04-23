function forStatement(statement,condition,incrementer,block){
    this.statement = statement
    this.condition = condition
    this.incrementer = incrementer
    this.block = block
}

forStatement.prototype.toString = function () {
    return "(for: " + this.statement.toString() + " while " + this.condition.toString() + 
    " : " + this.incrementer.toString() + "\n" + this.block.toString()+")"
}

forStatement.prototype.analyze = function(context){
	this.statement.analyze(context)
	this.condition.analyze(context)
	this.incrementer.analyze(context)
    this.block.analyze(context)
}

module.exports = forStatement