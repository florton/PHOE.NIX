function arrayIndex(exps){
    this.exps = exps
}

arrayIndex.prototype.toString = function () {
    return "(arrayIndex: " + this.exps.toString() + ")"
}

module.exports = arrayIndex