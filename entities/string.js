var Type = require('./type')

function stringLit(name){
	this.name = name;
}

stringLit.prototype.toString = function () {
	return this.name;
}

stringLit.prototype.analyze = function(context) {
	this.type = Type.stringLit;
}

module.exports = stringLit