Detector Web Interface
==========================

This code runs a webpage of graphs showing cosmic ray data from several detectors.

##Launching the display
sudo nginx service start

##Gathering data

Each detector's data must be concatenated into a file called 'all.dat'
cat * > all.dat

The all.dat file must be in the same directory as the formatLog.C program.
This program will modify the data, then place it in an 'allFormat.dat' file for processing.

## Updating the display
sudo g++ formatLog.C
sudo ./a.out

Each detector's data must be analyzed separately.

#using the script
Place the Liquid Scintillator's 'all.dat' file in the folder named 'LScint'.
Place the Pot detector's 'all.dat' file in the folder named 'Pot'.
Place the 4-paddle detector's'all.dat' file in the folder named '4Paddle'.
sudo ./dataAnalysis.sh


#manually
The liquid scintillator detector's data may be left as 'allFormat.dat'.
The 4-paddle detector's data should be renamed from 'allFormat.dat' to 'allFormat4Paddle.dat'.
The pot detector's data should be renamed from 'allFormat.dat' to 'allFormatPot.dat'.
