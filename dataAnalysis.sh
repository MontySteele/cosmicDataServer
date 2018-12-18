#!/usr/bin/env bash

cd MkData/
sudo g++ formatLog.c
sudo ./a.out
sudo cp allFormat.dat ../.

cd ../Pot
sudo g++ formatLog.c
sudo ./a.out
sudo cp allFormat.dat ../allFormatPot.dat

cd ../4Paddle
sudo g++ formatLog.c
sudo ./a.out
sudo cp allFormat.dat ../allFormat4Paddle.dat

cd ..
