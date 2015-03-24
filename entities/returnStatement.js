function returnStatement(exps){
    this.exps = exps
}

returnStatement.prototype.toString = function () {
    return "(return: " + this.exps.toString() + ")"
}

module.exports = returnStatement