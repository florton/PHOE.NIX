![PHEO.NIX](http://i.imgur.com/uQkfRJ0.png)
#[Phoenix Theme Song](https://www.youtube.com/watch?v=h5EofwRzit0)

####Like the legend of the Phoenix, we understand that C++ is an extremely powerful programming language, but are also aware that it is difficult for modern programmers to adopt. In the spirit of modern syntactical languages like Python, with Phoenix we attempt to retain the functionality of C++ while making it much simpler for the programmer to write.

####Phoenix files end in `.nix` and are compiled down into a C++11 `.cpp` file and a `.h` header. Our initial goal is primary functionality, but we will continue to expand and have been discussing ways  to eventually allow all valid C++ code, however, in the alpha version, only what is specified within the Phoenix Documentation will be valid Phoenix code.

##Basic Syntax
	//Comments start with double backslash

	/*
	Multiline comments start with backslash star
	and end with star backslash
	*/
	
	//Scoping is accomplished through indentation
	//Statements are one line unless the line ends with a comma
	
###Variables

	//There are no semicolons or curly braces in Phoenix
	//Variables must be typed
	//There are 4 basic types

	//integers
	int x = 5004

	//doubles can have a decimal point
	double d = 10.432

	//strings are surrounded with double quotes
	string s = "Hello"

	//booleans
	bool t = true
	bool f = false

	//strings can be added together 
	string str = "First part of the string" + "second part of the string"
	
###Standard IO

	//The standard input (cin) is "prompt"

	string s

	prompt s
	//user enters "hello"

	//The standard output (cout) is "print"

	print s

	//prints "hello" to console


###Functions
	//function declaratons must have a return type or can be void
	void printx(int x)
		print x

	int returnx(int x)
		return x


####Command Line arguments

	//Every D++ program has a reserved array "args"
	//args contains command line arguments
	//args[0] contains the name of the program
	//args[1] is the first argument

	//user runs the program 
	//phoenix text.nix 1 3 5
	
	print args[0]
	//prints "test"
	print args[1]
	//prints "1"
	print args[2]
	//prints "3"
	print args[3]
	//prints "5"
	
####File layout
		
	//All code not within function declarations is run as if it were in a main

	//All function declarations will be automatically placed into the .h file when compiled
	//The user can also define additons to the .h file by adding them under a "header" block

	header:
		//everything here is added to the header file

	//Users can also declare private and public variables with "public" and "private"

	public:
		int x
	
	private:
		string y


##Statements

###If statement:
    if x == 5
		//do something
###If Else & Elseif statements:
	if x <= 5
		//do something
	elseif x > 7
		//do something
	else
		//do something
###For loop:
	for int x=1 while x<=10 : x++
		//do something 10 times

	for int x=0 until x==10 : x++
		//do something 10 times
###While loop:
	while x != 10
		//do something
###Until loop
	until check == true
		//do something
######This is equivalent to
	until check
		//do something
	

###Swap statement (Credit to Cobrascript)
	int a = 5
	int b = 6
	a :=: b
	//now a = 6 and b = 5

##Lambdas Closures and Anonymous Functions
####The `lambda` keyword has multiple functionality, it can be used for pythonic lambda functions
	func int f = lambda(int x) x*5
	int a = f(10)
	// a = 50
#### it can also be used to declare anonymous functions
	func void f = lambda()
		print "Hello"
	f()
	//prints Hello to console

	void lambda()
    	print "foo"
	()	
	//prints Hello to console
	
#### and for closures
	func int addTwo(int y)
		int x = y
		return lambda()
			x+2
			print x

	func int a = addTwo(2)
	a()
	a()
	//Console prints:
	//4
	//6

##Examples
###Returns the xth number in the Fibonacci sequence, the 0th and 1st numbers being 1
	int fibonacci(int x)
		if x<2
			return 1
		else
			return fibonacci(x-2)+fibonacci(x-1)

	print fibonacci(7)
	//Console prints 21

###returns the next odd number
	int nextOdd(int x)
		int currentNum = x
		if x % 2 == 0
			return x+1
		else
			return x+2

	print nextOdd(8)
	//Console prints 9

## A small C++ program vs its Phoenix equivalent

####C++
	
	#include<iostream>
	 
	using namespace std;
	 
	class programming
	{
	   private:
		  int variable;
	 
	   public:
	 
		  void input_value()
		  {
			 cout << "In function input_value, Enter an integer\n";
			 cin >> variable;
		  }
	 
		  void output_value()
		  {
			 cout << "Variable entered is ";
			 cout << variable << "\n";
		  }
	};
	 
	main()
	{
	   programming object;
	 
	   object.input_value();
	   object.output_value();
	 
	   //object.variable;  Will produce an error because variable is private
	 
	   return 0;
	}
	
####Phoenix
	class programming
		private int variable
	
		void input_value()
			print "In function input_value, Enter an integer\n"
			prompt variable
	
		void output_value()
			print "Variable entered is "
			print variable + "\n"

	programming object

	object.input_value()
	object.output_value()



##Phoenix MicroSyntax

	keyword=‘func’|’return’|’print’|’prompt’|’args’|’if’|’else’|’elseif’|’for’|'while'|'until’|’class’|’void’|'lambda'|'public'|'private'|'header'
	id=[A-Za-z][A-Za-z0-9_*]
	string=^[“]([^”\\]|[\\][“\\bfnrt])*[“]$
	int=[0-9+]
	double=int\.int
	bool=true|false
	scope=::
	swap =:=:
	assop= ==|=|=+|=-|=*|=\
	addop=+|-|++|--
	multop= *|/|%|**
	relop= >|<|<=|>=|&| ||