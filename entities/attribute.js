function attribute(left,right){
    this.left = left
    this.right = right
}

attribute.prototype.toString = function () {
    return this.left + "." + this.right
}

module.exports = attribute