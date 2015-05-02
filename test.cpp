#include <iostream>
#include <stdio.h>
#include <string>
using namespace std;
string variable  ;

void prinX(int x){
   cout << x << endl;
}
int returX(int x){
   return x;
}
int nextOdd(int x){
   int currentNum = x;
   if(x % 2 == 0) {
       return x + 1;
   }
   else {
       return x + 2;
   }
}
int fibonacci(int x){
   if(x < 2) {
       return 1;
   }
   else {
       return fibonacci(x - 2) + fibonacci(x - 1);
   }
}
int* makeChange(int x){
   static int coins[4]  ;
   if(x < 0) {
       cout << "amount cannot be negative" << endl;
   }
   coins[0] = x / 25;
   coins[3] = x % 25;
   coins[1] = coins[3] / 10;
   coins[3] %= 10;
   coins[2] = coins[3] / 5;
   coins[3] %= 5;
   return coins;
}

int main(int argc, char** argv) {
    int x = 5004;
    double d = 10.432;
    string s = "Hello";
    bool t = true;
    bool f = false;
    string str = "First part of the string second part of the string"  ;
    int y = 5;
    static int arr[4] = {1, 2, 3, 4};
    arr[0] = 5;
    static string st[3][2]  ;
    st[0][0] = 99;
    st[0][1] = "here I am";
    st[2][3] = "hello";
    string userIn  ;
    getline(cin, userIn);
    cout << userIn << endl;
    class a{
        public:
            int x  ;
        private:
            string y  ;
    };
    if(x == 5) {
        nextOdd(x);
    }
    if(x <= 5) {
        nextOdd(x - 1);
    }
    else 
    if(x > 7) {
        nextOdd(x / 7);
    }
    else {
        nextOdd(x % 5);
    }
    for(x = 1; x <= 10; x ++ ) {
    }
    while (x != 10) {
        int x  ;
    }
    do {
        x += 5004;
    } while(false);
    x = true;
    do {
        x ++ ;
    } while(x < 5);
    x = 5;
    cout << fibonacci(7) << endl;
    cout << nextOdd(8) << endl;
    class programming{
        public:
            void input_value(){
                cout << "In function input_value, Enter an integer\n" << endl;
                getline(cin, variable);
            }
            void output_value(){
                cout << "Variable entered is " << endl;
                cout << variable << "\n" << endl;
            }
    };
    programming object  ;
    object.input_value();
    object.output_value();
    return 0;
}

