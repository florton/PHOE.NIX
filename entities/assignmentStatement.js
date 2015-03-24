function assignmentStatement(names,operator,exp){
    this.names = names
    this.operator = operator
    this.exp = exp
}

assignmentStatement.prototype.toString = function () {
    return this.names.toString() + this.operator + this.exp
}

module.exports = assignmentStatement