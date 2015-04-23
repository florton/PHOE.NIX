function varRef(token){
    this.token = token
}

varRef.prototype.toString = function () {
    return "(varRef: "+ this.token +")"
}

varRef.prototype.analyze = function (context) {
  this.referent = context.lookupVariable(this.token)
  this.type = this.referent.type
}

module.exports = varRef