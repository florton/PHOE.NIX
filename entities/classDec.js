function classDec(name,block){
	this.name = name
	this.block = block
}

classDec.prototype.toString = function(){
   return "(class: " + this.name + "\n" + this.block.toString() + ")"	
}

module.exports = classDec