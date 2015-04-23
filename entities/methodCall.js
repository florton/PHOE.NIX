function methodCall(name,args){
    this.name = name
    this.args = args
}

methodCall.prototype.toString = function () {
    return "methodCall: " + "("+ this.name.toString() + "(" + this.args.toString() + ")"+")"
}

methodCall.prototype.analyze = function (context) {
  this.referent = context.lookupVariable(this.name)
  this.type = this.referent.type	
}

module.exports = methodCall