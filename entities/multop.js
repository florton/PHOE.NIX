function multop(left,op,right){
    this.left = left
    this.op = op
    this.right=right
}

multop.prototype.toString = function () {
    return this.left + this.op + this.right
}

module.exports = multop