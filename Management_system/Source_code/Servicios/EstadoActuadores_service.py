#!/usr/bin/python3
import pyrebase
import os
import json
import time
import subprocess as sp
config = json.loads(sp.getoutput('cat firebase-credentials.json'))

firebase = pyrebase.initialize_app(config)
database = firebase.database()


def stream_handler(message):
    #f = open ('Ram_Var/mi_archivo.txt','w')
    print("cambio actuadores")
    os.system("echo " +"'"+json.dumps(database.child("Control/Actuadores").get().val())+"'"+"> Ram_Var/actuadores.txt")
    #f.write(message["data"])
    #f.close()
    #output = sp.getoutput("cat Ram_Var/mi_archivo.txt")

my_stream = database.child("Control/Actuadores").stream(stream_handler)

while True:
    time.sleep(1)

