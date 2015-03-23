function funcDec(type,name,params,block){
    this.type = type
    this.name = name
    this.params = params
    this.block = block
}

funcDec.prototype.toString = function () {
    return this.type + " " + this.name + " " + this.params.toString() + "\n" + block.toString() 
}

module.exports = funcDec