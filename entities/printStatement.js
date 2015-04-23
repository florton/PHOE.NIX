function printStatement(exps){
    this.exps = exps
}

printStatement.prototype.toString = function () {
    return "(print: " + this.exps.toString() +")"
}

printStatement.prototype.analyze = function (context) {
  this.exps[0].analyze(context)
}

module.exports = printStatement