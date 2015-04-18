var Type = require('./type')

function varDec(type,name,exp){
    this.type = type
    this.name = name
    this.exp = exp
}

varDec.prototype.toString = function () {
    return "(varDec: "+ this.type + " " + this.name.toString() + " " + this.exp.toString() + ")"
}

varDec.ARBITRARY = new varDec('<arbitrary>', Type.ARBITRARY)

module.exports = varDec