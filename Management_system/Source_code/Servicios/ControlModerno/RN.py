from joblib import dump, load
import pickle
from os import path

from sklearn.preprocessing import StandardScaler



loaded_model = pickle.load(open("/home/acuaponito/Desktop/Servicios/ControlModerno/Modelos/RNmodel.sav", 'rb'))
sc=load('/home/acuaponito/Desktop/Servicios/ControlModerno/Modelos/std_scaler.bin')
dim=load('/home/acuaponito/Desktop/Servicios/ControlModerno/Modelos/dim_sacaler_17to10.bin')


def prediction(x):
    #Import normalization model
    normalizated=sc.transform(x)
    #Import Reduction Dimentionaliti
    redim=dim.transform(normalizated)
    #Import model RN and Predict
    return loaded_model.predict(redim)

