var stringLit = require("./string.js")

function addop(left,op,right){
    this.left = left
    this.op = op
    this.right=right
}

addop.prototype.toString = function () {
    return "(addop: "+ this.left + this.op + this.right + ")"
}

addop.prototype.analyze = function (context){
    if(this.left instanceof stringLit && this.right instanceof stringLit){
        this.left = this.left.name.slice(0,-1) + this.right.name.slice(1)
        this.op =''
        this.right = ''
    }

}

module.exports = addop