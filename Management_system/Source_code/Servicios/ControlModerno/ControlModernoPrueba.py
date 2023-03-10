from RN import prediction
from Control_fuzzy import pc_lum

import datetime as dt
import numpy as np

import subprocess as sp
import json
import os

TDS_sp=250
TEMP_sp=22
set_point=np.array([TDS_sp,TEMP_sp])




def random_estrategy(n,min,max):

    new_array = np.zeros((n,3))
    for i in range(3):

        new_array[:,i] = np.random.randint(low=min[i]*100,high=max[i]*100, size=n)/100
    #return a (n,3) array of random values
    #(oxigeno,ciculacion,aireacion)
    return new_array



def fuzzy_strategy(val,hour):
    #get fuzzy value for the light
    #code
    return pc_lum(val,hour)
def restrictions():
    #(luz,circulacion,oxigenacion,aireacion)
    hora=2 #get hour
    min=[0,0.2,0.3,0]
    max=[0.99,0.99,0.99,0.99]

    return min,max










def get_registros():
     #code to read from ram and get the 3 array of size n(PENDIENTE)
    
    TDS_reg=np.array([])
    Tmp_reg=np.array([])
    os.system("curl 'https://pg-web-page-default-rtdb.firebaseio.com/DatosSensoresInterno.json?orderBy="+'"$key"'+"&limitToLast=6'>/home/acuaponito/Desktop/Servicios/Ram_Var/last6_sensor.txt ")
    os.system("curl 'https://pg-web-page-default-rtdb.firebaseio.com/DatosSensoresExterno.json?orderBy="+'"$key"'+"&limitToLast=1'>/home/acuaponito/Desktop/Servicios/Ram_Var/last1Lum_sensor.txt ")
  
    
    actuadores_act=sp.getoutput("cat /home/acuaponito/Desktop/Servicios/Ram_Var/last6_sensor.txt")
    actuadores=json.loads(actuadores_act)

    for data in reversed(actuadores):
        TDS_reg=np.append(TDS_reg,actuadores[data]['TDS'])
        Tmp_reg=np.append(Tmp_reg,actuadores[data]['TEMP'])
        #print(actuadores[data])
    #Lum_reg=np.zeros((1,6))
    last_lum=0
    luminosidad=sp.getoutput("cat /home/acuaponito/Desktop/Servicios/Ram_Var/last1Lum_sensor.txt")
    #print(luminosidad)
    luminosidad_json=json.loads(luminosidad)
    for data in luminosidad_json:
        #print(luminosidad_json[data])
        last_lum=luminosidad_json[data]['valor']

        #print(luminosidad_json[data])
        
    return last_lum,np.array([*TDS_reg, *Tmp_reg])



def get_best_values(set_point,number_try,sen,ciclo_lum,rand_ciclos):
    
    
    #print(set_point,sen,ciclo_lum)
    score=100000
    conjunto_ciclos=1
    best_y=0
    for i in range(number_try):
        x=np.array([*sen ,obtener_hora(), ciclo_lum,*rand_ciclos[i,:]])[np.newaxis]
        #print(x,x.shape)
        #print(x)
        y=prediction(x)
        #print(y,y[0,1],set_point-y[0,1])
        score_new=abs(set_point-y[0,1])
        
        if score_new<score:
            score=score_new
            conjunto_ciclos=i
            best_y=y
    print(best_y)
    return score,conjunto_ciclos,best_y
        

def obtener_hora():
    return int(dt.datetime.now().hour)

def get_ciclos_control(set_point):
    #number of values for random estrategy(the best for the mayor divergency is 1000 in this case)
    number_try=1000
    #get the registers of sensor(TDS,TMP) (1,12)
    lum,sen=get_registros()
    #get value of ligth
    
    ciclo_lum_fuzzy=fuzzy_strategy(float(lum),obtener_hora())
    
    #get restrictions
    minr,maxr=restrictions()
    #get the random values
    #print(minr,maxr)
    
    rand_ciclos=random_estrategy(number_try,minr[1:4],maxr[1:4])
    #print(rand_ciclos)
    
    #get the strategy
    escore,pos_ciclos,best_y=get_best_values(set_point,number_try,sen,ciclo_lum_fuzzy,rand_ciclos)
    #print(escore,pos_ciclos)
    
    return [ciclo_lum_fuzzy,*rand_ciclos[pos_ciclos,:]],best_y

def get_ciclos_predichos():
    set_point_temp=22
    return get_ciclos_control(22)
def get_Porcentajes_predictivo():
    ciclos,prediction=get_ciclos_predichos()
    x = {"porc_iluminacion": ciclos[0],"porc_humectacion": 0,"porc_circulacion":ciclos[1],"porc_oxigenacion":ciclos[2],"porc_aireacion":  ciclos[3]}
    bd_json={"ciclos":x,"predicciones":{"TDS":prediction[0,0],"temp":prediction[0,1]}}
    os.system('mosquitto_pub -h localhost -t "Prediction/ciclos2" -m '+"'"+json.dumps(bd_json)+"'")
    #print('mosquitto_pub -h localhost -t "Prediction/ciclos" -m '+"'"+json.dumps(bd_json)+"'")
    return x


os.system("echo " +"'"+json.dumps(get_Porcentajes_predictivo())+"'"+"> /home/acuaponito/Desktop/Servicios/Ram_Var/ciclos_pred2.txt")

def function_probe():
    print("inicio")
    os.system("curl 'https://pg-web-page-default-rtdb.firebaseio.com/DatosSensoresInterno.json?orderBy="+'"$key"'+"&limitToLast=6'>/home/acuaponito/Desktop/Servicios/Ram_Var/last6_sensor.txt ")
    print("ya")
    


    

