function addop(left,op,right){
    this.left = left
    this.op = op
    this.right=right
}

addop.prototype.toString = function () {
    return "(addop"+ this.left + this.op + this.right + ")"
}

module.exports = addop