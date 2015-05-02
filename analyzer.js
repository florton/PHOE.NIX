var error = require('./error.js').analyzeError
var VariableDeclaration = require('./entities/variableDeclaration.js')
var variableReference = require("./entities/variableReference.js")
var attribute = require("./entities/attribute.js")

function AnalysisContext(parent) {
  this.parent = parent
  this.symbolTable = {}
}

AnalysisContext.initialContext = function () {
  return new AnalysisContext(null)
}

AnalysisContext.prototype.createChildContext = function () {
  return new AnalysisContext(this)
}

AnalysisContext.prototype.variableMustNotBeAlreadyDeclared = function (token) {
  if (this.symbolTable[token]) {
    error('Variable ' + token + ' already declared')
  }
}

AnalysisContext.prototype.addVariable = function (name, entity) {
  this.symbolTable[name] = entity
}

AnalysisContext.prototype.lookupVariable = function (token) {
  if(token instanceof attribute){
    token.left = this.lookupVariable(token.left)
    token.right = this.lookupVariable(token.right) 
    return token
  }else{
    var variable = this.symbolTable[token]
    if (variable) {
        return variable
    } else if (!this.parent) {
        if(token instanceof variableReference){token = token.token}
        error('Variable ' + token + ' not found')
    } else {
        return this.parent.lookupVariable(token)
    }
  }
}

exports.initialContext = AnalysisContext.initialContext