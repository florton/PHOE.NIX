function postfixop(exp, op){
    this.op = op
    this.exp = exp
}

postfixop.prototype.toString = function () {
    return this.exp.toString() + this.op
}

module.exports = postfixop