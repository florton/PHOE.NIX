
//Variables

int x = 5004
double d = 10.432
string s = "Hello"
bool t = true
bool f = false 
string str = "First part of the string" + "second part of the string"
int y = 5



//Arrays
int arr[4] = [1,2,3,4]  
// x = [1,2,3,4] 
arr[0]= 5
//x = [5,2,3,4]

//matrixes 

string st[3][2]
//st = [[,],[,],[,]]
st[0][0]=99
st[0][1]="here I am"
//st= [[99,"here I am"],[,],[,]]
st[2][3]="hello"
//st= [[99,"here I am"],[,],[hello]]


//Standard IO

string userIn
prompt userIn
//user enters "hello"

//The standard output (cout) is "print"     

print userIn

//prints "hello" to console

//Functions

void prinX(int x)
    print x

int returX(int x)
    return x

class a
    public
        int x

    private
        string y

int nextOdd(int x)
    int currentNum = x
    if x % 2 == 0
        return x+1
    else
        return x+2
if x == 5
    nextOdd( x )

if x <= 5
    nextOdd( x - 1 )
else if x > 7
    nextOdd( x/7 )
else
    nextOdd( x %5 )

for int x=1 while x<=10 : x++
    //do something 10 times

while x != 10
    int x

do 
    x+=5004
while false
    x =true
//runs once

x = 4**9
do 
    x++
while x<5
    x=5
//runs 5 times

int fibonacci(int x)
    if x<2
        return 1
    else
        return fibonacci(x-2)+fibonacci(x-1)

print fibonacci(7)
//Console prints 21

print nextOdd(8)
//Console prints 9

int makeChange(int x)
    int coins[4]
    if x<0
        print "amount cannot be negative"

    coins[0]= x/25
    coins[3] = x % 25
    coins[1]= coins[3]/10
    coins[3] %= 10
    coins[2]= coins[3]/5
    coins[3] %= 5

    return coins

class programming
    global
        string variable
        
    public

        void input_value()
            print "In function input_value, Enter an integer\n"
            prompt variable

        void output_value()
            print "Variable entered is "
            print variable + "\n"

programming object

object.input_value()
object.output_value()

