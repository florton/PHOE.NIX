function arrayLit(exps){
    this.exps = exps
}

arrayLit.prototype.toString = function () {
    return "(array: " + this.exps.toString() + ")"
}

arrayLit.prototype.analyze = function (context) {
}

module.exports = arrayLit