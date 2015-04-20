function promptStatement(exp){
    this.exp = exp
}

promptStatement.prototype.toString = function () {
    return "(prompt: " + this.exp.toString() + ")"
}

module.exports = promptStatement