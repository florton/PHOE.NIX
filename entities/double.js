var Type = require('./type')

function doubleLit(name){
	this.name = name;
}

doubleLit.prototype.toString = function () {
	return this.name;
}

doubleLit.prototype.analyze = function(context) {
	this.type = Type.doubleLit;
}

module.exports = doubleLit