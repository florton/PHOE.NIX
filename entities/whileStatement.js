function whileStatement(condition,block){
    this.condition = condition
    this.block = block
}

whileStatement.prototype.toString = function () {
    return "(while " + this.condition.toString() + "\n" + this.block.toString() +")"
}

module.exports = whileStatement