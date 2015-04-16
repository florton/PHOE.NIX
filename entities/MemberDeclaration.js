function memberDec(access,block){
    this.access=access
    this.block = block
}

memberDec.prototype.toString = function () {
    return "(memberDec: "+this.access.toString() + "\n" + this.block.toString() +")"
}

module.exports = memberDec