function assignmentStatement(names,operator,exp){
    this.names = names
    this.operator = operator
    this.exp = exp
}

assignmentStatement.prototype.toString = function () {
    return names.toString() + operator.toString() + exp.toString()
}

module.exports = assignmentStatement