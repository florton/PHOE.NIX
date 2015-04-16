function ifStatement(condition,block){
    this.condition = condition
    this.block = block
}

IfStatement.prototype.toString = function () {
    return "(if: " + this.condition.toString() + "\n" + this.block.toString() +")"
}

module.exports = IfStatement