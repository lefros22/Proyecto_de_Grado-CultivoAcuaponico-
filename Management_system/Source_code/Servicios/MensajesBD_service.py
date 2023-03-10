#!/usr/bin/python3
import paho.mqtt.client as mqtt  #import the client1
import time
import json
import datetime as dt
import pyrebase
config = {
"apiKey": "AIzaSyBv1jfvRCuRGuXm4BH71wqHRC8R1LS8Tas",
"authDomain": "pg-web-page",
"databaseURL": "https://pg-web-page-default-rtdb.firebaseio.com/",
"storageBucket": "project-1396921858"
}

firebase = pyrebase.initialize_app(config)
database = firebase.database()




def on_connect(client, userdata, flags, rc):
    if rc==0:
        client.connected_flag=True #set flag
        print("connected OK")
    else:
        print("Bad connection Returned code=",rc)
errores=0         
def on_message(client, userdata, message,tmp=None):
    global errores
    
    try:
        Mensajes=json.loads(message.payload)
        date={"Fecha":dt.datetime.now().strftime("%m/%d/%Y, %H:%M:%S")}
        Mensajes.update(date)
        database.child("Mensajes").push(Mensajes)
        if Mensajes["Tipo"]=="emergencia":
            database.child("Control/stateControl").set("Pemergencia")
    except:
        print("hubo error")
        errores=1
    



mqtt.Client.connected_flag=False#create flag in class
broker="localhost"
client = mqtt.Client("MensajesBD")             #create new instance 
client.on_connect=on_connect  #bind call back function
client.on_message = on_message
client.loop_start()
print("Connecting to broker ",broker,1883)
client.connect(broker,1883)      #connect to broker
while not client.connected_flag: #wait in loop
    print("In wait loop")
    time.sleep(1)
print("in Main Loop")
client.subscribe("main/mensajes")

while not errores:
    time.sleep(1)