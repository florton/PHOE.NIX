function prefixop(op,exp){
    this.op = op
    this.exp = exp
}

prefixop.prototype.toString = function () {
    return this.op + this.exp.toString()
}

module.exports = prefixop