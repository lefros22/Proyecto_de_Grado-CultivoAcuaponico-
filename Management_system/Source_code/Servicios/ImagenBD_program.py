import subprocess as sp
import pyrebase
import time
config = {
"apiKey": "AIzaSyBv1jfvRCuRGuXm4BH71wqHRC8R1LS8Tas",
"authDomain": "pg-web-page",
"databaseURL": "https://pg-web-page-default-rtdb.firebaseio.com/",
"storageBucket": "project-1396921858"
}

firebase = pyrebase.initialize_app(config)
database = firebase.database()


while True:
    database.child("Streaming/Image").set(sp.getoutput('base64 Ram_Var/captura.jpg'))
    time.sleep(3)
