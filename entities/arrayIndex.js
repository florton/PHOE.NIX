function arrayIndex(exps){
    this.exps = exps
}

arrayIndex.prototype.toString = function () {
    return "(arrayIndex: " + this.exps.toString() + ")"
}

arrayIndex.prototype.analyze = function (context) {
}

module.exports = arrayIndex