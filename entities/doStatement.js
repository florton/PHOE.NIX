function doStatement(condition,block){
	this.condition = condition
	this.block = block 
}

doStatement.prototype.toString = function(){
	return "do " + "\n" + this.block.toString() + "\n" + "while" + this.condition.toString()
}