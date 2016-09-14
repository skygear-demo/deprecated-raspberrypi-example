#!/bin/bash
if [ "$1" == "gen" ]
then
  echo 'SKYGEAR_USERNAME="'$(cat /proc/cpuinfo | grep Serial | cut -d ':' -f2 | tr -d '[[:space:]]')'"' > ./skygear.env
  echo 'SKYGEAR_PASSWORD="'$(cat /sys/class/net/eth0/address)'"' >> ./skygear.env
  echo 'SKYGEAR_ENDPOINT="'$2'"' >> ./skygear.env
  echo 'SKYGEAR_APIKEY="'$3'"' >> ./skygear.env
else
  source /home/pi/raspberrypi-example/skygear.env

  export SKYGEAR_USERNAME
  export SKYGEAR_PASSWORD
  export SKYGEAR_APIKEY
  export SKYGEAR_ENDPOINT
fi
