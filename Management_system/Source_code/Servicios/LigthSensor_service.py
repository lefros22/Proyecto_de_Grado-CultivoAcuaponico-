#!/usr/bin/python3
import smbus2
import time
import os
import datetime as dt
# Define some constants from the datasheet
DEVICE     = 0x23 # Default device I2C address
POWER_DOWN = 0x00 # No active state
POWER_ON   = 0x01 # Power on
RESET      = 0x07 # Reset data register value
ONE_TIME_HIGH_RES_MODE = 0x20
 
bus = smbus2.SMBus(1)  # Rev 2 Pi uses 1
 
def convertToNumber(data):
  # Simple function to convert 2 bytes of data
  # into a decimal number
    return ((data[1] + (256 * data[0])) / 1.2)
errores=0
def readLight(addr=DEVICE):
    try:
        data = bus.read_i2c_block_data(addr,ONE_TIME_HIGH_RES_MODE,3)
        return convertToNumber(data)
    except:
        errores=1

def main():
    global errores
    prom=0
    acum=0
    i=0
    flag=False
    hora_act=dt.datetime.now().hour
    hora_ant=hora_act
    while not errores:
        hora_act=dt.datetime.now().hour
        acum=readLight()+acum
        i=i+1
        print("Light Level : " + str(acum/i) + " lux")
        if i==118:
            flag=True
            prom=acum/118
  
            
        if ((hora_act-hora_ant)%24==1):
            hora_ant=hora_act
            if hora_act%2==0:
                acum=0
                i=0
                if flag:
                    os.system('mosquitto_pub -h localhost -t "Main/sensorExr/Ligth" -m '+"'"+str(prom)+"'")


        time.sleep(60)
        print("endccicle")
 
if __name__=="__main__":
    main()
