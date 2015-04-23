function addop(left,op,right){
    this.left = left
    this.op = op
    this.right=right
}

addop.prototype.toString = function () {
    return "(addop: "+ this.left + this.op + this.right + ")"
}

addop.prototype.analyze = function (context){
	if((this.left.constructor.name == 'String' || this.left.constructor.name == 'stringLit') && (this.right.constructor.name == 'String' || this.right.constructor.name == 'stringLit')){
		this.left = this.left+this.right
		this.op =''
		this.right = ''
	}

}

module.exports = addop