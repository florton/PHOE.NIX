print "Hello and welcome to my domain"
print "What is your name? "
string s
prompt s
print "Hello " + s
string a =""
while a!= "Y" && a!= "Yes" && a!= "y" && a!= "yes"
	if a != "" 
		print "Despicable let me ask again"
	print s + " you are presented with a great quest. Do you accept? Y/N"
	a = " "
	prompt a
print "I admire your courage. Lead on!"
int health = 100
string inventory[100]

string grid[5][5]

grid[3][3] = "You find yourself in a clearing. \n To your north is a castle \n to your east is a wall \n to your west is an open field \n to your south is a dark forest. \n"
grid[3][4] = "You find yourself at a decaying and abandoned castle"
grid[3][2] = "Y find yourself in a dark vine filled Forest"
grid[4][3] = "You are at wall, wow, its a wall"
grid[2][3] = "You stand alone in a huge field, hope there's no thunder"


int posx = 3

int posy = 3

while true
    int current_xpos = posx
    int current_ypos = posy
    print "-------------------------------------"
    print grid[posx][posy]
    print "What will you do? [type help for list of commands]"
    string choice
    prompt choice
    if choice == "help"
        print "------------------------------------- \n HELP \n------------------------------------- \n go: north, east south or west \n get: object \n use: object" 
    else if choice == "go north" || choice == "north"
        posy++
    else if choice == "go south" || choice == "south"
        posy--
    else if choice == "go west" || choice == "west"
        posx--
    else if choice == "go east" || choice == "east"
        posx++
    else
        print "that is not a valid command"
        
    if grid[posx][posy]==""
            print "You cannot go that way"
            posx = current_xpos
            posy = current_ypos