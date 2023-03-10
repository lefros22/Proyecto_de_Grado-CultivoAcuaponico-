import subprocess as sp
import pyrebase
import time
import json
import subprocess as sp
config = json.loads(sp.getoutput('cat firebase-credentials.json'))

firebase = pyrebase.initialize_app(config)
database = firebase.database()


while True:
    database.child("Streaming/Image").set(sp.getoutput('base64 Ram_Var/captura.jpg'))
    time.sleep(3)
