import json

porc_iluminacion = 0.8  #Debe ser float entre 0 y 1
porc_humectacion = 0.0  #Debe ser float entre 0 y 1, se asume el mismo para ambos niveles
porc_circulacion = 0.99  #Debe ser float entre 0 y 1
porc_oxigenacion = 0.99
porc_aireacion = 0.2





x = {
"porc_iluminacion": 0.8,
"porc_humectacion": 0.4,
"porc_circulacion": 0.99,
"porc_oxigenacion": 0.99,
"porc_aireacion":  0.2,
}

# convert into JSON:
y = json.dumps(x)


def Porcentajes(ciclo):
    global x

    #00:00-02:00
    if ciclo ==  1:
        x = {"porc_iluminacion": 0,"porc_humectacion": 0,"porc_circulacion": 0.99,"porc_oxigenacion": 0.99,"porc_aireacion":  0}
    #02:00-04:00
    elif ciclo ==  2:
        x = {"porc_iluminacion": 0,"porc_humectacion": 0,"porc_circulacion": 0.99,"porc_oxigenacion": 0.99,"porc_aireacion":  0}
    #04:00-06:00
    elif ciclo ==  3:
        x = {"porc_iluminacion": 0,"porc_humectacion": 0,"porc_circulacion": 0.99,"porc_oxigenacion": 0.99,"porc_aireacion":  0}
    #06:00-08:00
    elif ciclo ==  4:
        x = {"porc_iluminacion": 0.99,"porc_humectacion": 0,"porc_circulacion": 0.99,"porc_oxigenacion": 0.99,"porc_aireacion":  0}
    #08:00-10:00
    elif ciclo ==  5:
        x = {"porc_iluminacion": 0.99,"porc_humectacion": 0,"porc_circulacion": 0.99,"porc_oxigenacion": 0.99,"porc_aireacion":  0.99}
    #10:00-12:00
    elif ciclo ==  6:
        x = {"porc_iluminacion": 0.99,"porc_humectacion": 0,"porc_circulacion": 0.99,"porc_oxigenacion": 0.99,"porc_aireacion":  0.99}
    #12:00-14:00
    elif ciclo ==  7:
        x = {"porc_iluminacion": 0.99,"porc_humectacion": 0,"porc_circulacion": 0.99,"porc_oxigenacion": 0.99,"porc_aireacion":  0.99}
    #14:00-16:00
    elif ciclo ==  8:
        x = {"porc_iluminacion": 0.99,"porc_humectacion": 0,"porc_circulacion": 0.99,"porc_oxigenacion": 0.99,"porc_aireacion":  0.99}
    #16:00-18:00
    elif ciclo ==  9:
        x = {"porc_iluminacion": 0.99,"porc_humectacion": 0,"porc_circulacion": 0.99,"porc_oxigenacion": 0.99,"porc_aireacion":  0.99}
    #18:00-20:00
    elif ciclo ==  10:
        x = {"porc_iluminacion": 0.99,"porc_humectacion": 0,"porc_circulacion": 0.99,"porc_oxigenacion": 0.99,"porc_aireacion":  0.99}
    #20:00-22:00
    elif ciclo ==  11:
        x = {"porc_iluminacion": 0.99,"porc_humectacion": 0,"porc_circulacion": 0.99,"porc_oxigenacion": 0.99,"porc_aireacion":  0}
    #22:00-24:00
    elif ciclo ==  12:
        x = {"porc_iluminacion": 0,"porc_humectacion": 0,"porc_circulacion": 0.99,"porc_oxigenacion": 0.99,"porc_aireacion":  0}
    return x

import subprocess as sp

def get_Porcentajes_predictivo():
    #set_point_temp=22
    #ciclos=get_ciclos_control(22)
    x = sp.getoutput("cat /home/acuaponito/Desktop/Servicios/Ram_Var/ciclos_pred.txt")
    return json.loads(x)


