function attribute(left,right){
    this.left = left
    this.right = right
}

attribute.prototype.toString = function () {
    return "(attribute: "+this.left.toString() + this.right.toString() + ")"
}

module.exports = attribute