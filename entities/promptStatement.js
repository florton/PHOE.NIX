function promptStatement(exp){
    this.exp = exp
}

promptStatement.prototype.toString = function () {
    return "(prompt: " + this.exp.toString() + ")"
}

promptStatement.prototype.analyze = function (context) {
  this.exp.analyze(context)
}

module.exports = promptStatement