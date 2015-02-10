module.exports = {
error : function(line,line_Num,line_Pos){
var pos = "^";
for (var x=0; x<line_Pos; x++){pos = "-"+pos;}
var alert = "Syntax Error at: Line: " + line_Num + " Char: " + line_Pos;
var error = alert + "\n" + line + "\n" + pos;
throw error;
}
};