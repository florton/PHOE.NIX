function prefixop(op,exp){
    this.op = op
    this.exp = exp
}

prefixop.prototype.toString = function () {
    return "(prefixop: "+this.op + this.exp.toString() +")"
}

prefixop.prototype.analyze = function (context) {
  this.exp.analyze(context)
}

module.exports = prefixop