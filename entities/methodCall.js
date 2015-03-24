function methodCall(name,args){
    this.name = name
    this.args = args
}

methodCall.prototype.toString = function () {
    return "methodCall: " + "("+ this.name.toString() + "(" + this.args.toString() + ")"+")"
}

module.exports = methodCall