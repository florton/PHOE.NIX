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

module.exports = forStatement