function script(block){
    this.block = block
}

script.prototype.toString = function () {
    return this.block.toString()
}

module.exports = script