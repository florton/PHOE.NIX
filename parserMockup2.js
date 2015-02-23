var scanner = require("./scanner.js").scan;

scanner("photest.txt", function (tokens) {

	var index = 0;
	var indents = [0,0];
	
	while (index<token.length-1){
		if(!parseBlock()){
			//error
		}
	}
	//success?
	
	
	
	function indentLevel(){
		var indent = 0;
		if(at('indent')){
			indents[1]++;
			indentLevel();
		}else{
			if (indents[1]>indents[0]){
				indent = 1;
			} else if (indents[1]<indents[0]){
				indent = -1;
			}
			indents = [indents[1],0];
			return indent;
		}
	}
	
	function at(type) {
		while(tokens[index].type === 'comment'){
			index++;
		}
        if(type === tokens[index].type){
			index++;
			return true;
		}else{
			return false;
		}  
    }	
	
	function parseBlock(){
		if (indentLevel()===1){
			parseStatement();
			if (indentLevel===-1){
				return true;
			}
		}
		return false;
	}
	
	function parseStatement(){
        if (at('class'){
			//parseClass();			
		}
		if (at('type'){
			parseType();	
		}
		if (at('for'){}
		if (at('id'){}
		if (at('while'){} 
		if (at('do'){}
		if (at('if')){

		} 
	}
	
	function parseType(){

    }
	
	parseId(){
		
	}
	
	parseArray(){
		
		
	}
	
	parseFunction(){
		
		
	}

	
});

