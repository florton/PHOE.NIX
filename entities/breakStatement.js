function breakStatement(){
    this.break = "break"
}

breakStatement.prototype.toString = function () {
    return "break;"
}

breakStatement.prototype.analyze = function (context) {
}

module.exports = breakStatement