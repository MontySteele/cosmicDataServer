#!/bin/bash
# Script that reads in serial port, and outputs it to a file with the current timestamp.
today=`TZ=":UTC" date '+%Y_%m_%d__%H_%M_%S'`;
stty -F /dev/ttyACM0 cs8 9600 ignbrk -brkint -icrnl -imaxbel -opost -onlcr -isig -icanon -iexten -echo -echoe -echok -echoctl -echoke noflsh -ixon -crtscts
echo $today > $today.log
cat /dev/ttyACM0 >> $today.log
