function relop(left,op,right){
    this.left = left
    this.op = op
    this.right=right
}

relop.prototype.toString = function () {
    return "(relop: "+this.left + this.op + this.right + ")"
}

relop.prototype.analyze = function(context) {
	if((this.left.constructor.name == 'intLit' || this.left.constructor.name == 'doubleLit') && (this.right.constructor.name == 'intLit' || this.right.constructor.name == 'doubleLit')){		
	}else{throw new Error("Relational operators can only be applied to numbers")}
}

module.exports = relop