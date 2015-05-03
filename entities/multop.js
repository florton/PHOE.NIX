var intLit = require("./int.js")
var doubleLit = require("./double.js")
var addop = require("./addop.js")

function multop(left,op,right){
    this.left = left
    this.op = op
    this.right=right
}

multop.prototype.toString = function () {
    return "(multop: "+this.left + this.op + this.right+")"
}

multop.prototype.analyze = function() {
        this.right.analyze()
        if(this.right.op === '' && this.right.right === ''){
            this.right = this.right.left
        }
        //this.optimize()
}

multop.prototype.optimize = function (){
    if((this.left instanceof intLit || this.left instanceof doubleLit)&&(this.right instanceof intLit || this.right instanceof doubleLit)){
        switch (this.op){
            case "*":
                this.left = new doubleLit(parseFloat(this.left) * parseFloat(this.right))
                break;
            case "/":
                this.left = new doubleLit(parseFloat(this.left) / parseFloat(this.right))
                break;
            case "%":
                this.left = new doubleLit(parseFloat(this.left) % parseFloat(this.right))
                break;
        }

            this.op = ''
            this.right = ''
    }
}

module.exports = multop