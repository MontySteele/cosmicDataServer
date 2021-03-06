#!/bin/bash

# 4 paddle data
cd /home/msteele9/public_html/4Paddle

yes | rm all.dat

scp -o "ProxyCommand ssh -q msteele9@npg.phy-astr.gsu.edu nc -w 120 %h %p" cosmic@131.96.180.229:/home/cosmic/data/"20*" .


cat 20* > all.dat

g++ formatLog.C
./a.out
cp allFormat.dat  /home/msteele9/public_html/allFormat4Paddle.dat



# Pot data
cd /home/msteele9/public_html/Pot

yes | rm all.dat

scp -o "ProxyCommand ssh -q msteele9@npg.phy-astr.gsu.edu nc -w 120 %h %p" cosmic@131.96.180.167:/var/www/html/data/"20*" .

cat 20* > all.dat

g++ formatLog.C
./a.out
cp allFormat.dat  /home/msteele9/public_html/allFormatPot.dat



# Liquid scintillator data
cd /home/msteele9/public_html/MkData

yes | rm all.dat

scp -o "ProxyCommand ssh -q msteele9@npg.phy-astr.gsu.edu nc -w 120 %h %p" cosmic@131.96.4.27:/var/www/html/MkData/all.dat .

g++ formatLog.C
./a.out
cp allFormat.dat  /home/msteele9/public_html/allFormat.dat
