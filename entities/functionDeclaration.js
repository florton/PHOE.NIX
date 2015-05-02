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
  
  this.params.forEach(function(param) {
  //  context.addVariable(param.name, this)
  }	)
  context.variableMustNotBeAlreadyDeclared(this.name)
  context.addVariable(this.name.token, this)
}

module.exports = funcDec