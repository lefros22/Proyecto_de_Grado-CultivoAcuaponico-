
import './MControl.css';
import { useState } from 'react';
import MLoginRegister from '../../components/MLoginRegister/MLoginRegister'
import MHeaderDiagramControl from '../../components/MHeaderDiagramControl/MHeaderDiagramControl'
import {connect} from 'react-redux';
import  MHeaderTMessenger from '../../components/MHeaderTMessenger/MHeaderTMessenger'

import {setControl,setActuator} from '../../store/actions/ui';
import {useEffect} from 'react'
import axios from 'axios';

import StartFirebase from '../../bd/BdFirebaseConfig';
import {onValue,ref,get,set,getDatabase,update,remove,child,limitToLast, query} from "firebase/database"

function Control(props) {
    const [db,setdb]= useState(StartFirebase());
    const [mensajes,set_mensajes]= useState([{id:'',Descripcion:'',Fecha:'',Hora:''},{id:'',Descripcion:'',Fecha:'',Hora:''},{id:'',Descripcion:'',Fecha:'',Hora:''}
    ,{id:'',Descripcion:'',Fecha:'',Hora:''},{id:'',Descripcion:'',Fecha:'',Hora:''},{id:'',Descripcion:'',Fecha:'',Hora:''}]);


    function actualizar_arrays(data){
        /*const CultivoData=[];
        for(const [key,value] of Object.entries(data)){
            CultivoData.push(value);
        };
        console.log("se convirtieron datos ")
        let datos={
            id:CultivoData.map((data) => data.id),
            Ph:CultivoData.map((data) => data.Ph),
            Turbidez:CultivoData.map((data) => data.Turbidez),
            Temperatura:CultivoData.map((data) => data.Temperatura),
            Luminosidad:CultivoData.map((data) => data.Luminosidad),
            OD:CultivoData.map((data) => data.OD),
            Humedad:CultivoData.map((data) => data.Humedad)
        }
        SetdatosSensor(datos)
        console.log(CultivoData.map((data) => data.id))*/
      

    };

    function CargaMensajes(data){
        const MensajeData=[];
        for(const [id,value] of Object.entries(data)){
            MensajeData.push({id,...value});
        };
        console.log(MensajeData);
        set_mensajes(MensajeData.reverse());
    }

    function CargayLectura(states,valActuators){

        
        



        console.log("pruebita;"+states)
        if(states==="Pemergencia"){
            //axios.post("http://localhost:5050/CambiarActuatuors",valActuators).then((response)=>{});

        }
        else if (states==="Automatico"){
            //axios.get("http://localhost:5050/StateControl").then((response)=>{console.log("estadocontrol:");props.setControl(response.data);})
            //axios.get("http://localhost:5050/Actuators").then((response)=>{console.log("Estado Actuadores ");props.setActuator(response.data);});
            get(ref(db,"Control/Actuadores")).then((snapshot)=> {
                //actualizar_arrays(snapshot.val());
                console.log(snapshot.val());
                props.setActuator(snapshot.val())}
            ,{ onlyOnce: true})
        }
        else if (states==="Manual") {
            console.log("entro a cambiar en manual")
            console.log(valActuators)
            update(ref(db,"Control/Actuadores"),valActuators).then((snapshot) => {
                console.log("entro a cambiar en manua2l")})
            //axios.post("http://localhost:5050/CambiarActuatuors",valActuators).then((response)=>{});
        } 
        else {
            
        }

    };

    function actu_state_bd(state){
        console.log(state);
        console.log("entro a wctualizar estado en bd")
        update(ref(db,"Control/"),{stateControl:state}).then((snapshot) => {});
    }

    useEffect(()=>{actu_state_bd(props.stateControl);console.log("actualizar state in bd")},[props.stateControl]);

    useEffect(()=>{onValue(query(ref(db,"Mensajes"), limitToLast(15)), (snapshot) => {CargaMensajes(snapshot.val())});console.log("se uso useeffect para mensajes")},[]);
    //useEffect(()=>{const idsin=setInterval(()=>{CargayLectura(props.stateControl,props.stateActuator)},500);return ()=> clearInterval(idsin);});
    useEffect(()=>{const idsin=setInterval(()=>{CargayLectura(props.stateControl,props.stateActuator)},500);return ()=> clearInterval(idsin);});




    const Mensajet={Fecha:"22/4/24",Hora:"6:3", id:1213213,tipo:1,Descripcion:"pruebita funciono"}
    const mensajesA=[Mensajet,Mensajet,Mensajet,Mensajet,Mensajet,Mensajet,Mensajet,Mensajet,Mensajet,Mensajet]

    return(
        <div className='control-component'>
       
            <div className='control-component-aling'> 
                <MHeaderDiagramControl />

            
            </div>
            <div className='control-component-mensajes'>
                <div className='control-component-mensajes-text'>Mensajes</div>
                <div className='control-component-mensajes-block'>< MHeaderTMessenger Mensajes={mensajes}/></div>
            </div>
        
        </div>
    );
}
const mapStateToProps =(state)=>{
    return {
      stateActuator: state.uiReducer.stateActuator,
      stateControl: state.uiReducer.stateControl
    };
  }
const mapActionsToProps ={
setControl,setActuator
}
export default connect(mapStateToProps,mapActionsToProps)(Control);