function funcDec(type,name,params,block){
    this.type = type
    this.name = name
    this.params = params
    this.block = block
}

funcDec.prototype.toString = function () {
    return "(function: "+this.type + " " + this.name + " " + this.params.toString() + "\n" + this.block.toString() +")"
}

funcDec.prototype.analyze = function(context){
  this.name.analyze(context)
  this.params.forEach(function(param) {
  	param.name.analyze(context)
  })	
  context.variableMustNotBeAlreadyDeclared(this.name)
  context.addVariable(this.name, this)
}

module.exports = funcDec