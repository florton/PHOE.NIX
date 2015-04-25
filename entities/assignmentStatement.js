function assignmentStatement(name,operator,exp){
    this.name = name
    this.operator = operator
    this.exp = exp
}

assignmentStatement.prototype.toString = function () {
    return "(assignmentStatement: "+ this.name.toString() + this.operator + this.exp+ ")"
}

assignmentStatement.prototype.analyze = function (context) {
  this.name.analyze(context)
  if(this.operator!==("++" || "--" )){
    this.exp.analyze(context)
  }
}

module.exports = assignmentStatement