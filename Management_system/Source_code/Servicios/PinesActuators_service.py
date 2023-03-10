#!/usr/bin/python3
import paho.mqtt.client as mqtt  #import the client1
import time
import json
import RPi.GPIO as GPIO

#PIN3 GPIO 3 AirPump
AirPump = 22
#PIN5 GPIO 3 Fan
Fan = 24
#PIN7 GPIO 4 Humidifer1
Humidifer1 = 7
#PIN11 GPIO 17 Humidifer2
Humidifer2 = 11
#PIN13 GPIO 27 Lamp1
Lamp1 = 13
#PIN15 GPIO 22 Lamp2
Lamp2 = 15
#PIN19 GPIO 10 WaterPump1
WaterPump1 = 19
#PIN21 GPIO 9 WaterPump2
WaterPump2 = 21
#PIN23 GPIO 11 Peristaltic1
Peristaltic1 = 23
#PIN29 GPIO 5 Peristaltic2
Peristaltic2 = 29
#PIN31 GPIO 6 Valve1
Valve1 = 31
#PIN33 GPIO 13 Valve2
Valve2 = 33
#PIN35 GPIO 19 ValveIn
ValveIn = 35
#PIN37 GPIO 26 AlimentacionSensores
SensoresVcc = 37



GPIO.setmode(GPIO.BOARD)  # Terminal by number.
GPIO.setwarnings(False)

GPIO.setup(AirPump, GPIO.OUT)
GPIO.setup(Fan, GPIO.OUT)
GPIO.setup(Humidifer1, GPIO.OUT)
GPIO.setup(Humidifer2, GPIO.OUT)
GPIO.setup(Lamp1, GPIO.OUT)
GPIO.setup(Lamp2, GPIO.OUT)
GPIO.setup(WaterPump1, GPIO.OUT)
GPIO.setup(WaterPump2, GPIO.OUT)
GPIO.setup(Peristaltic1, GPIO.OUT)
GPIO.setup(Peristaltic2, GPIO.OUT)
GPIO.setup(Valve1, GPIO.OUT)
GPIO.setup(Valve2, GPIO.OUT)
GPIO.setup(ValveIn, GPIO.OUT)
GPIO.setup(SensoresVcc, GPIO.OUT)

def Actuator_set():
    #AC
    GPIO.output(AirPump, True)
    GPIO.output(Fan, not False)
    GPIO.output(Humidifer1, not False)
    GPIO.output(Humidifer2, not False)
    GPIO.output(Lamp1, not False)
    GPIO.output(Lamp2, not False)
    GPIO.output(WaterPump1,not False)
    GPIO.output(WaterPump2, not False)
    #DC
    GPIO.output(Peristaltic1, not False)
    GPIO.output(Peristaltic2, not False)
    GPIO.output(Valve1, not False)
    GPIO.output(Valve2, not False)
    GPIO.output(ValveIn, not False)
    GPIO.output(SensoresVcc, not False)
Actuator_set()
def on_connect(client, userdata, flags, rc):
    if rc==0:
        client.connected_flag=True #set flag
        print("connected OK")
    else:
        print("Bad connection Returned code=",rc)
def on_message(client, userdata, message,tmp=None):
    actuadores=json.loads(str(message.payload,'utf-8'))
    
    GPIO.output(AirPump,actuadores["AirPump"])
    #nc
    GPIO.output(Fan, not actuadores["Fan"])
    #nc
    GPIO.output(Humidifer1, not actuadores["Humidifer1"])
    #nc
    GPIO.output(Humidifer2, not actuadores["Humidifer2"])
    #nc
    GPIO.output(Lamp1, not actuadores["Lamp1"])
    #nc
    GPIO.output(Lamp2, not actuadores["Lamp2"])
    #nc
    GPIO.output(WaterPump1,not actuadores["WaterPump1"])
    #nc
    GPIO.output(WaterPump2, not actuadores["WaterPump2"])
    #DC
    GPIO.output(Peristaltic1, not actuadores["Peristaltic1"])
    GPIO.output(Peristaltic2, not actuadores["Peristaltic2"])
    GPIO.output(Valve1, not actuadores["Valve1"])
    GPIO.output(Valve2, not actuadores["Valve2"])
    GPIO.output(ValveIn, not actuadores["ValveIn"])
    GPIO.output(SensoresVcc, not actuadores["SensoresVcc"])

    

mqtt.Client.connected_flag=False#create flag in class
broker="localhost"
client = mqtt.Client("PinesActuadores")             #create new instance 
client.on_connect=on_connect  #bind call back function
client.on_message = on_message

client.loop_start()
print("Connecting to broker ",broker,1883)
client.connect(broker,1883)      #connect to broker
while not client.connected_flag: #wait in loop
    print("In wait loop")
    time.sleep(1)
print("in Main Loop")
client.subscribe("main/actuators")
while True:
    time.sleep(1)
