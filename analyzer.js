var error = require('./error.js').analyzeError
var VariableDeclaration = require('./entities/variableDeclaration.js')

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
  var variable = this.symbolTable[token]
  if (variable) {
    return variable
  } else if (!this.parent) {
    error('Variable ' + token + ' not found')
    return varDec.ARBITRARY
  } else {
    return this.parent.lookupVariable(token)
  }
}

exports.initialContext = AnalysisContext.initialContext