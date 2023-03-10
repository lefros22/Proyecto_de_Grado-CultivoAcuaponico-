#!/bin/bash
newStatus=false

ping -c 1 www.google.com > /dev/null
pingStatus=$?

if [ $pingStatus == 0 ]
then newStatus=true
else newStatus=false

fi


if [ "$newStatus" == "true" ]
then echo "ON"  > /home/acuaponito/Desktop/Servicios/Ram_Var/statusInternet
else echo "OFF" > /home/acuaponito/Desktop/Servicios/Ram_Var/statusInternet
fi


prevStatus=$newStatus