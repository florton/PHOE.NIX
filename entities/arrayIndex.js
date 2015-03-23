function arrayIndex(exps){
    this.exps = exps
}

arrayIndex.prototype.toString = function () {
    return this.exps.toString()
}

module.exports = arrayIndex