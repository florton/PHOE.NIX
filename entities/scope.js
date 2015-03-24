function scope(left,op,right){
	this.left = left
	this.op = op
	this.right = right
}

scope.prototype.toString = function(){
	return "(scope"+this.left + this.op + this.right +")"
}

module.exports = scope