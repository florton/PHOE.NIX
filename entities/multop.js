function multop(left,op,right){
    this.left = left
    this.op = op
    this.right=right
}

multop.prototype.toString = function () {
    return "(multop: "+this.left + this.op + this.right+")"
}

multop.prototype.analyze = function() {

}

module.exports = multop