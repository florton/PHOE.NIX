function arrayLit(exps){
    this.exps = exps
}

arrayLit.prototype.toString = function () {
    return "(array: " + this.exps.toString() + ")"
}

module.exports = arrayLit