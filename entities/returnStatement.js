function returnStatement(exps){
    this.exp = exp
}

returnStatement.prototype.toString = function () {
    return "(return: " + this.exp.toString() + ")"
}

module.exports = returnStatement