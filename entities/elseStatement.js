function elseStatement(block){
    this.block = block
}

elseStatement.prototype.toString = function () {
    return "else: " + "\n" + this.block.toString()
}

module.exports = elseStatement