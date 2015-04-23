function relop(left,op,right){
    this.left = left
    this.op = op
    this.right=right
}

relop.prototype.toString = function () {
    return "(relop: "+this.left + this.op + this.right + ")"
}

relop.prototype.analyze = function(context) {

}

module.exports = relop