function classDec(name,block){
	this.name = name
	this.block = block
}

classDec.prototype.toString = function(){
   return "(class: " + this.name + "\n" + this.block.toString() + ")"	
}

classDec.prototype.analyze = function(context){
	this.block.analyze(context)
	context.variableMustNotBeAlreadyDeclared(this.name)
    context.addVariable(this.name.token, this)
}

module.exports = classDec