function postfixop(exp, op){
    this.op = op
    this.exp = exp
}

postfixop.prototype.toString = function () {
    return "(postfixop: "+this.exp.toString() + this.op+")"
}

module.exports = postfixop