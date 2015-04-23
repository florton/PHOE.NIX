function scope(left,op,right){
	this.left = left
	this.op = op
	this.right = right
}

scope.prototype.toString = function(){
	return "(scope: "+this.left + this.op + this.right +")"
}

scope.prototype.analyze = function(context) {
	this.left.analyze(context)
	this.right.analyze(context)
};

module.exports = scope