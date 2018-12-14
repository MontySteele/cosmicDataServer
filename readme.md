Detector Web Interface
==========================

This code runs a webpage of a raspberryPi connected to a Coincidece Counter to display a live updating graph with a moving average.
## Install
Installation guide for a raspberry pi, these commands require sudo.

### Download
If git is not installed.
```bash
apt-get -y update
apt-get -y install git
```
Then just clone this repository.
```bash
git clone https://github.com/ahruschka/detectorWebInterface
```

### Copy Files
If you are updating, or installing after changes were made.
```bash
cd /var/www/detectorWebInterface
```

Then just copy the files over, and change mode.

```bash
cp -R ./* /var/www/detectorWebInterface
chmod -R 755 /var/www/detectorWebInterface/*
```

### Recording Data
This script `serialToLog.sh` needs to be run in `/var/www/detectorWebInterface/` to begin recording data to a `.log` file. This script creates a new log file with the unix timestamp and populates it with the output of your detector. This specific file is for the original arduino to rPi detector and will need to be slightly modified for others.

The file displayed needs to be manually set by changing the logName variable within `chart.js`.
```
#!/bin/bash
# Script that reads in serial port, and outputs it to a file with the current timestamp.
today=`date '+%Y_%m_%d__%H_%M_%S'`;
stty -F /dev/ttyACM0 cs8 9600 ignbrk -brkint -icrnl -imaxbel -opost -onlcr -isig -icanon -iexten -echo -echoe -echok -echoctl -echoke noflsh -ixon -crtscts
echo $today > $today.log
cat /dev/ttyACM0 >> $today.log
```
## Resources
[Setting up a Wifi Dongle on the raspberryPi](https://gist.github.com/ahruschka/4ae8e51a4af98182195cd9286a39a1c6)

[Fixing the date on GSU NTP servers](https://gist.github.com/ahruschka/4d7949a97257172971481bec3c902bca)
