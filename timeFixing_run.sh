#!/bin/bash
# Script that reads in serial port, and outputs it to a file with the current timestamp.
mv 2016_08_08__16_35_03.log 2016_08_08__20_35_03.log
sed "1s/.*/2016_08_08__20_35_03/" 2016_08_08__20_35_03.log
#today="2016_08_08__20_35_03"
stty -F /dev/ttyACM0 cs8 9600 ignbrk -brkint -icrnl -imaxbel -opost -onlcr -isig -icanon -iexten -echo -echoe -echok -echoctl -echoke noflsh -ixon -crtscts
#echo $today > $today.log
cat /dev/ttyACM0 >> 2016_08_08__20_35_03.log
