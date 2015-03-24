function methodDec(access,block){
    this.access=access
    this.block = block
}

methodDec.prototype.toString = function () {
    return this.access.toString() + "\n" + block.toString() 
}

module.exports = methodDec