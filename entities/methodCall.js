function methodCall(name,args){
    this.name = name
    this.args = args
}

methodCall.prototype.toString = function () {
    return "methodCall: " + "("+ this.name.toString() + "(" + this.args.toString() + ")"+")"
}

methodCall.prototype.analyze = function (context) {
    this.name.analyze(context)
    //this.args.analyze(context)
}

module.exports = methodCall