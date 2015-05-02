var Type = require('./type')

function varDec(type,name,exp){
    this.type = type
    this.name = name
    this.exp = exp
}

varDec.prototype.toString = function () {
    return "(varDec: "+ this.type + " " + this.name.toString() + " " + this.exp.toString() + ")"
}

varDec.prototype.analyze = function (context) {
  context.variableMustNotBeAlreadyDeclared(this.name)
  context.addVariable(this.name, this)
  
  if(this.exp.exp!==''){this.exp.analyze(context)}
}

module.exports = varDec