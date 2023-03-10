#!/usr/bin/python3
from time import sleep
import json
import datetime as dt
import subprocess as sp
import os
import threading
#mod control
import Control_module

#messages
genericoOnOFF =  '{ "Tipo":"generico", "Descripcion":"control On/off funcionando"}'
genericoPredictivo =  '{ "Tipo":"generico", "Descripcion":"control Predictivo funcionando"}'

genericoNuevoCiclo =  '{ "Tipo":"generico", "Descripcion":"inicio Nuevo ciclo"}'

genericoDosificacion =  '{ "Tipo":"generico", "Descripcion":"se dosifica alimento"}'


#Funciones de ciclo
horas_ciclo = 2
#Devuelve la hora de 00 a 23
def obtener_hora():
    return dt.datetime.now().hour

# Devuelve los minutos de 00 a 59
def obtener_minutos():
    return dt.datetime.now().minute

def obtener_segundos():
    return dt.datetime.now().second
#Definir en qué ciclo del día está
def ciclo_dia():
    global horas_ciclo
    ciclo = (obtener_hora() // horas_ciclo) + 1
    return ciclo
def porcentaje_de_ciclo():
    suma_minutos = obtener_minutos() / 60
    hora_min = obtener_hora() + suma_minutos
    modulo = hora_min % horas_ciclo
    porcentaje_ciclo = modulo / horas_ciclo
    return porcentaje_ciclo



#Automatizacion general
Val_Actuadores ={"AirPump": True,"Fan": False,"Feeder": False,"Humidifer1": False,"Humidifer2": False,"Lamp1": False,"Lamp2": False,"Peristaltic1": False,"Peristaltic2": False,"Valve1": False,"Valve2": False,"ValveIn": False,"WaterPump1": False,"WaterPump2": False,"SensoresVcc": False}

Val_Actuadores_emergencia ={"AirPump": True,"Fan": False,"Feeder": False,"Humidifer1": False,"Humidifer2": False,"Lamp1": False,"Lamp2": False,"Peristaltic1": False,"Peristaltic2": False,"Valve1": False,"Valve2": False,"ValveIn": False,"WaterPump1": False,"WaterPump2": False,"SensoresVcc": False}


plantas_iluminadas = False
peces_alimentados = False
plantas_humectadas = False
agua_circulada = False
agua_oxigenada = False
agua_aireada = False


def activacion_acciones_porcentaje(porcentajes):
    porcentaje_actual = porcentaje_de_ciclo()+0.01
    #Iluminacion plantas
    iluminacion_plantas(porcentaje_actual,porcentajes["porc_iluminacion"])
    #Iluminacion plantas
    humectacion_plantas(porcentaje_actual,porcentajes["porc_humectacion"])
    #Circulacion agua
    circulacion_agua(porcentaje_actual,porcentajes["porc_circulacion"])
    #Oxigenacion agua
    oxigenacion_agua(porcentaje_actual,porcentajes["porc_oxigenacion"])
    #Aireacion agua
    aireacion_agua(porcentaje_actual,porcentajes["porc_aireacion"])


def iluminacion_plantas(pa,po):
    #print("funcion de iluminacion",)
    global Val_Actuadores,plantas_iluminadas
    if (pa<po):
        Val_Actuadores["Lamp1"] = True
        Val_Actuadores["Lamp2"] = True
    else:
        Val_Actuadores["Lamp1"] =False
        Val_Actuadores["Lamp2"] = False
        plantas_iluminadas = True

def humectacion_plantas(pa,po):
    #print("funcion de humectacion")
    global Val_Actuadores,plantas_humectadas
    if (pa<po):
        Val_Actuadores["Humidifer1"] = True
        Val_Actuadores["Humidifer2"] = True
    else:
        Val_Actuadores["Humidifer1"] =False
        Val_Actuadores["Humidifer2"] = False
        plantas_humectadas = True


def oxigenacion_agua(pa,po):
    #print("funcion de oxigenacion")
    global Val_Actuadores,agua_oxigenada
    if (pa<po): Val_Actuadores["AirPump"] = True
    else:
        Val_Actuadores["AirPump"] =False
        agua_oxigenada = True


def aireacion_agua(pa,po):
    #print("funcion de aireacion")
    global Val_Actuadores,agua_aireada
    if (pa<po): Val_Actuadores["Fan"] = True
    else:
        Val_Actuadores["Fan"] =False
        agua_aireada = True

def thread_circulacion():
    global Val_Actuadores
    Val_Actuadores["WaterPump1"] =True
    sleep(10)
    Val_Actuadores["WaterPump1"] =False
    sleep(150)
    
my_thread_circulacion = threading.Thread(target=thread_circulacion)
def circulacion_agua(pa,po):
    #print("funcion de aireacion")
    global Val_Actuadores,agua_aireada,my_thread_circulacion
    if (pa<po): 
        if not my_thread_circulacion.is_alive():
            my_thread_circulacion = None
            my_thread_circulacion = threading.Thread(target=thread_circulacion)
            my_thread_circulacion.start()
    else:
        Val_Actuadores["WaterPump1"] =False
        agua_aireada = True

def dosificar(ci):
    if ci in (5,7,8,9,10):
        os.system('mosquitto_pub -h localhost -t "esp32/input" -m "Dosificar"')
        os.system("mosquitto_pub -h localhost -t 'main/mensajes' -m '"+genericoDosificacion+"'")

def apagarsensor():
    global Val_Actuadores
    sleep(2)
    os.system('mosquitto_pub -h localhost -t "esp32/input" -m "Sensar"')
    sleep(50)
    Val_Actuadores["SensoresVcc"] =False

def sensar():
    Val_Actuadores["SensoresVcc"] =True
    my_thread_apagarsensor=None
    my_thread_apagarsensor = threading.Thread(target=apagarsensor)
    my_thread_apagarsensor.start()









def reinicio_variables():
    global plantas_iluminadas,peces_alimentados,plantas_humectadas, agua_circulada,agua_oxigenada,agua_aireada
    plantas_iluminadas = False
    peces_alimentados = False
    plantas_humectadas = False
    agua_circulada = False
    agua_oxigenada = False
    agua_aireada = False



def Update_Actuator():
    global Val_Actuadores
    #os.system('mosquitto_pub -h localhost -t "main/actuators" -m "'+json.dumps(Val_Actuadores)+'"')
    


#loop
cambio_ciclo=True
ciclo=ciclo_dia()
ciclo_anterior=ciclo-1
actuadores_act='0'
actuadores_ant='1'


while True:
    sleep(0.2)

    #print(Val_AirPump)
    EstateControl=sp.getoutput("cat Ram_Var/estado.txt")
    
    if EstateControl == 'Manual':
        actuadores_act=sp.getoutput("cat Ram_Var/actuadores.txt")
        #print(actuadores_act,Val_Actuadores["WaterPump1"])
    elif EstateControl == 'Automatico':
        estado_internet=sp.getoutput("cat Ram_Var/statusInternet")
        #sobre escribiendo para que se active el on off
        estado_internet='OFF'
        if cambio_ciclo:
            os.system("mosquitto_pub -h localhost -t 'main/mensajes' -m '"+genericoNuevoCiclo+"'")
            reinicio_variables()
            sensar()
            dosificar(ciclo)
            if estado_internet=='ON':os.system("mosquitto_pub -h localhost -t 'main/mensajes' -m '"+genericoPredictivo+"'")
            else: os.system("mosquitto_pub -h localhost -t 'main/mensajes' -m '"+genericoOnOFF+"'")
            
            
        
        if estado_internet=="ON":
            activacion_acciones_porcentaje(Control_module.get_Porcentajes_predictivo())
        else:
            activacion_acciones_porcentaje(Control_module.Porcentajes(ciclo))
        
        #activacion_acciones_porcentaje(Control_module.Porcentajes(ciclo))
        #activacion_acciones_porcentaje(Control_module.get_Porcentajes_predictivo())
        #print(Control_module.Porcentajes())
        actuadores_act=json.dumps(Val_Actuadores)
        #print(actuadores_act,Val_Actuadores["WaterPump1"])
    elif EstateControl == 'Pemergencia':
        actuadores_act=json.dumps(Val_Actuadores_emergencia)
    #actuadores
    if actuadores_act!=actuadores_ant:
        #print("entro a cambio de valores")
        os.system('mosquitto_pub -h localhost -t "main/actuators" -m '+"'"+actuadores_act+"'")
        actuadores_ant=actuadores_act
    #ciclo
    ciclo=ciclo_dia()
    if (ciclo-1)==((ciclo_anterior)%12):
        ciclo_anterior=ciclo
        print("cambio de ciclo")
        cambio_ciclo=True
    else:
        cambio_ciclo=False
