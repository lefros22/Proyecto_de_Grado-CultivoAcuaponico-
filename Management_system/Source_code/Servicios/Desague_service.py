import RPi.GPIO as GPIO
import sys
import time
import os
last_time= time.time()-10000000
last_mensaje_time= time.time()-100000
flag=0

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(16, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

contador = 0

def my_callback(channel):
    global contador,flag,last_time
    flag=1
    contador=contador+1
    last_time= time.time()



GPIO.add_event_detect(16, GPIO.RISING, callback=my_callback)
x =  '{ "Tipo":"emergencia", "Descripcion":"se activo el sensor de desague"}'
media=0
try:
    last_time_rein=time.time()
    while True:
        sys.stdout.write(str(contador))
        sys.stdout.flush()
        sys.stdout.write('\r')
        if (time.time()-last_time)/60<1 and (time.time()-last_mensaje_time)/60>10 and contador>40:
            #os.system("mosquitto_pub -h localhost -t 'main/mensajes' -m '"+x+"'")
            #os.system('echo ' + '"'+'Pemergencia'+'"'+'> Ram_Var/estado.txt')
            last_mensaje_time= time.time()
            print("detecto desague")
            
        if (time.time()-last_time_rein)/60>3:
            print("pulsaciones en 3 min",contador)
            last_time_rein=time.time()
            contador=0
        time.sleep(2)
        
except:
    print("hubo un error")

