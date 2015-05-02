function Block(statements) {
  this.statements = statements
}

Block.prototype.toString = function () {
  return '(Block: ' + this.statements.join('\n') + ")"
}

Block.prototype.analyze = function (context) {
  var localContext = context.createChildContext()
  this.statements.forEach(function (statement) {
    statement.analyze(localContext)
  })
}

Block.prototype.optimize = function () {
  var atReturn = false
  for(var i = 0; i < this.statements.length; i++){
    if(!atReturn){
        try{
            this.statements[i].block.optimize()
        }catch(e){}
        if(this.statements[i].constructor.name==='returnStatement'){atReturn=true}
    }else{
        delete this.statements[i]
    }
  }
  
}



module.exports = Block