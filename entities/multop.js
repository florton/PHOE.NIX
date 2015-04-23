function multop(left,op,right){
    this.left = left
    this.op = op
    this.right=right
}

multop.prototype.toString = function () {
    return "(multop: "+this.left + this.op + this.right+")"
}

multop.prototype.analyze = function() {
	if((this.left.constructor.name == 'intLit' || this.left.constructor.name == 'doubleLit') && (this.right.constructor.name == 'intLit' || this.right.constructor.name == 'doubleLit')){		
	}else{throw new Error("Multiplication/Division operators can only be applied to numbers")}
}

module.exports = multop