function attribute(left,right){
    this.left = left
    this.right = right
}

attribute.prototype.toString = function () {
    return "(attribute: "+this.left.toString() + this.right.toString() + ")"
}

attribute.prototype.analyze = function (context) {
    this.left.analyze(context)
}

module.exports = attribute