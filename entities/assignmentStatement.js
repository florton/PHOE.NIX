function assignmentStatement(names,operator,exp){
    this.names = names
    this.operator = operator
    this.exp = exp
}

assignmentStatement.prototype.toString = function () {
    return "(assignmentStatement: "+ this.names.toString() + this.operator + this.exp+ ")"
}

module.exports = assignmentStatement