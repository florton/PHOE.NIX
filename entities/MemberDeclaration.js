function methodDec(access,block){
    this.access=access
    this.block = block
}

methodDec.prototype.toString = function () {
    return this.access.toString() + "\n" + this.block.toString() 
}

module.exports = methodDec