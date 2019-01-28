#!/bin/bash

# 4 paddle data
cd /var/www/html/4Paddle

yes | rm all.dat

scp -o "ProxyCommand ssh -q msteele9@npg.phy-astr.gsu.edu nc -w 120 %h %p" cosmic@131.96.180.229:/home/cosmic/data/"20*" .


cat 20* > all.dat

g++ formatLog.C
./a.out
cp allFormat.dat  /var/www/html/allFormat4Paddle.dat



# Pot data
cd /var/www/html/Pot

yes | rm all.dat

scp -o "ProxyCommand ssh -q msteele9@npg.phy-astr.gsu.edu nc -w 120 %h %p" cosmic@131.96.180.167:/var/www/html/data/"20*" .

cat 20* > all.dat

g++ formatLog.C
./a.out
cp allFormat.dat  /var/www/html/allFormatPot.dat



# Liquid scintillator data
cd /var/www/html/MkData

yes | rm all.dat

scp -o "ProxyCommand ssh -q msteele9@npg.phy-astr.gsu.edu nc -w 120 %h %p" cosmic@131.96.4.27:/var/www/html/MkData/all.dat .

g++ formatLog.C
./a.out
cp allFormat.dat  /var/www/html/allFormat.dat
