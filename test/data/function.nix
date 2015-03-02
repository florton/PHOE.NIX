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
