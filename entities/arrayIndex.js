function arrayIndex(exps){
    this.exps = exps
}

arrayIndex.prototype.toString = function () {
    return "(Array: " + this.exps.toString() + ")"
}

module.exports = arrayIndex