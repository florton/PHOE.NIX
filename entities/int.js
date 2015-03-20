var Type = require('./type')

function intLit(name){
	this.name = name;
}

intLit.prototype.toString = function(){
	return this.name;
}

intLit.prototype.analyze = function(context) {
	this.type = Type.intLit;
}

module.exports = intLit