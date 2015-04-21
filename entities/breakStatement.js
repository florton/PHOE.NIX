function breakStatement(){
    this.break = "break"
}

breakStatement.prototype.toString = function () {
    return "break;"
}

module.exports = breakStatement