function returnStatement(exp){
    this.exp = exp
}

returnStatement.prototype.toString = function () {
    return "(return: " + this.exp.toString() + ")"
}

returnStatement.prototype.analyze = function(context){

}

module.exports = returnStatement