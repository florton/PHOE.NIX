function promptStatement(exps){
    this.exps = exps
}

promptStatement.prototype.toString = function () {
    return "prompt " + this.exps.toString()
}

module.exports = promptStatement