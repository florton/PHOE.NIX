function varRef(name){
    this.name = name
}

varRef.prototype.toString = function () {
    return "(varRef: "+ this.name +")"
}

varRef.prototype.analyze = function (context) {
  this.referent = context.lookupVariable(this.token)
  this.type = this.referent.type
}

module.exports = varRef