var stringLit = require("./string.js")
var intLit = require("./int.js")
var doubleLit = require("./double.js")

function addop(left,op,right){
    this.left = left
    this.op = op
    this.right=right
}

addop.prototype.toString = function () {
    return "(addop: "+ this.left + this.op + this.right + ")"
}

addop.prototype.analyze = function() {
        this.right.analyze()
        if(this.right.op === '' && this.right.right === ''){
            this.right = this.right.left
        }
        //this.optimize()
}

addop.prototype.optimize = function (){
    console.log(this.left+this.op+this.right)
    if((this.left instanceof intLit || this.left instanceof doubleLit)&&(this.right instanceof intLit || this.right instanceof doubleLit)){
        switch (this.op){
            case "+":
                this.left = new doubleLit(parseFloat(this.left) + parseFloat(this.right))
                break;
            case "-":
                this.left = new doubleLit(parseFloat(this.left) - parseFloat(this.right))
                break;
        }

            this.op = ''
            this.right = ''
    }
    
}

module.exports = addop