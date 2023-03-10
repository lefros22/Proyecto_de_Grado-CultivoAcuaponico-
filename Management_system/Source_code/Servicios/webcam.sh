#!/bin/bash

DATE=$(date +"%Y-%m-%d_%H%M")

fswebcam /home/pi/webcam/$DATE.jpg

for (( i=0; i<20; i++ ))
do
 sudo fswebcam /home/acuaponito/Desktop/Servicios/Ram_Var/captura.jpg
 sleep 3
done
