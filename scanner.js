/*
lines.js takes a file path as an arg and counts the non-blank non-commented lines
Authors: Flanders Lorton, Maurice Leavell 2014
*/
var file= process.argv[2];
var fs = require('fs');

var indent = /[\t]|[\s]{4}/
var id= /[A-Za-z][A-Za-z0-9_]*/;
var intLit= /[0-9]+/;
var Double= /intLit\.intLit/;
var bool= /true|false/;
var string= /^[“]([^”\\]|[\\][“\\bfnrt])*[“]$'/;
var type = /^(void|int|double|string|bool)$/;
var keywords = /^(?:return|print|prompt|args|if|else|elseif|for|while|until|class|lambda|public|private|header)$/;

var line_Num = 1;
var line_Pos=0;
var tokens = [];

fs.readFile(file, {encoding: 'utf-8'}, function (err, data) {
	if (err) throw err;
	var array_Of_Lines = data.split("\n");
	for(line in array_Of_Lines ) {
			if (!(/^\s+$/g.test(array_Of_Lines[line]))){
				getTokens(array_Of_Lines[line]);
			}
			line_Num++;
	}
	for(token in tokens){
		console.log( tokens[token].line_Num + " " + tokens[token].type);
	}
});

function getTokens(line){
	while (line_Pos<line.length-1){
		//indents
		var token = isToken("indent",indent,line);
		if(!token){
			line_Pos=0;
			return;}
		}
}


function isToken(type,regex,line){
	var match = matchIndex(regex,line.substring(line_Pos));
	if(match[0]){
		addToken(line_Num,line_Pos,type,match[1]);
		line_Pos+=match[2];
		return true;
	}else{
		return false;
	}
}

function addToken(line_Num, line_Pos, type, lexeme){

	var token ={
		line_Num:line_Num,
		line_Pos:line_Pos,
		type:type,
		lexeme:lexeme
	};

	tokens.push(token);
}

function matchIndex(regex, string){
	var match = regex.exec(string);
	var myMatch = [];
		
	if (match != null&&match.index==0){
		myMatch.push(true);
		myMatch.push(match[0]);
		myMatch.push(match[0].length);
	} else {
		myMatch.push(false);
	}	
	return myMatch;
}
