function funcDec(type,name,params,block){
    this.type = type
    this.name = name
    this.params = params
    this.block = block
}

funcDec.prototype.toString = function () {
    return "(function: "+this.type + " " + this.name + " " + this.params.toString() + "\n" + this.block.toString() +")"
}

module.exports = funcDec