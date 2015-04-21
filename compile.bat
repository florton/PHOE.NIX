@echo off
set file=%1%
if not "%1%"=="" goto run
set /p file="Enter Filename: "
:run
node phoenix.js %file% > %file:~0,-4%.cpp
g++ %file:~0,-4%.cpp -o %file:~0,-4%.exe
%file:~0,-4%.exe