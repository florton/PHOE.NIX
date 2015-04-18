var cache = {}

function Type(name) {
  this.name = name;
  cache[name] = this;
}

Type.bool = new Type('bool');
Type.intLit = new Type('intLit');
Type.stringLit = new Type('stringLit');
Type.doubleLit = new Type('doubleLit');
Type.ARBITRARY = new Type('<arbitrary_type>')
Type.prototype.toString = function () {
  return this.name
}

Type.prototype.mustBeInteger = function (message, location) {
  this.mustBeCompatibleWith(Type.intLit, message)
}

Type.prototype.mustBeBoolean = function (message, location) {
  this.mustBeCompatibleWith(Type.bool, message)
}

Type.prototype.mustBeCompatibleWith = function (otherType, message, location) {
  if (! this.isCompatibleWith(otherType)) {
    error(message, location)
  }
}

Type.prototype.mustBeMutuallyCompatibleWith = function (otherType, message, location) {
  if (! (this.isCompatibleWith(otherType) || otherType.isCompatibleWith(this))) {
    error(message, location)
  }
}

Type.prototype.isCompatibleWith = function (otherType) {
  // In more sophisticated languages, comapatibility would be more complex
  return this === otherType || this === Type.ARBITRARY || otherType === Type.ARBITRARY;  
}

module.exports = {
  bool: Type.bool,
  intLit: Type.intLit,
  stringLit: Type.stringLit,
  doubleLit: Type.doubleLit,
  ARBITRARY: Type.ARBITRARY,
  forName: function (name) {return cache[name]}
}