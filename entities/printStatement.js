function printStatement(exps){
    this.exps = exps
}

printStatement.prototype.toString = function () {
    return "(print " + this.exps.toString() +")"
}

module.exports = printStatement