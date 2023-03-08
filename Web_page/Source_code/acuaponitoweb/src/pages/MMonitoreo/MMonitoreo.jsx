import MVariableBar from '../../components/MHeaderBar/MVariableBar'
import './MMonitoreo.css';
import React from 'react';
import {Line} from 'react-chartjs-2';
import LineChart from "../../components/MHeaderGraph/LineChart";
import{ connect } from 'react-redux';
import { useState } from "react";
//import { CultivoData } from "./Data";
import {DropdownButton,Dropdown} from "react-bootstrap";

import {useEffect} from 'react'
import axios from 'axios';
//import GetDataSensor from '../../bd/BdFirebase';
import StartFirebase from '../../bd/BdFirebaseConfig';
import {onValue,ref,get,set,getDatabase,update,remove,child,limitToLast, query} from "firebase/database"



function MMonitoreo(props) {


    function actualizar_imagen(frame){
        setimagen(frame);

    }

    function actualizar_arrays(data,isIntern){
        if (isIntern==true) {
            const CultivoData=[];
            for(const [key,value] of Object.entries(data)){
                CultivoData.push(value);
            };
            console.log("se convirtieron datos ")
            console.log(CultivoData[1])
            let datos={
                id:CultivoData.map((data) => data.fecha),
                //Ph:CultivoData.map((data) => data.Ph),
                //Turbidez:CultivoData.map((data) => data.Turbidez),
                TDS:CultivoData.map((data) => data.TDS),
                
                Temperatura:CultivoData.map((data) => data.TEMP),
                //Luminosidad:CultivoData.map((data) => data.Luminosidad),
                //OD:CultivoData.map((data) => data.OD),
                //Humedad:CultivoData.map((data) => data.Humedad)
            }
            SetdatosSensor(datos)
            console.log(CultivoData.map((data) => data.TDS))
            /*
            Setid(datos.id);
            SetPh(datos.Ph);
            SetTurbidez(datos);
            SetTemperatura(CultivoData.map((data) => data.Temperatura));
            SetLuminosidad(CultivoData.map((data) => data.Luminosidad));
            SetOD(CultivoData.map((data) => data.OD));
            SetHumedad(CultivoData.map((data) => data.Humedad));*/
            //actualizarVariable(props.stateVariable,datos);
        }
        else{
            const CultivoData=[];
            for(const [key,value] of Object.entries(data)){
                CultivoData.push(value);
            };
            console.log("se convirtieron datos luminosidad")
            console.log(CultivoData[1])
            let datos={
                id:CultivoData.map((data) => data.fecha),
                //Ph:CultivoData.map((data) => data.Ph),
                //Turbidez:CultivoData.map((data) => data.Turbidez),
                
                Luminosidad:CultivoData.map((data) => data.valor),
                //Luminosidad:CultivoData.map((data) => data.Luminosidad),
                //OD:CultivoData.map((data) => data.OD),
                //Humedad:CultivoData.map((data) => data.Humedad)
            }
            SetdatosSensorExterno(datos)
            console.log(CultivoData.map((data) => data.TDS))

        }
        

    };
    //const dsa=onValue(query(ref(db,"DatosSensores"), limitToLast(10)), (snapshot) => {actualizar_arrays(snapshot.val())});

    function pedirdatos(cant){
        //axios.post("http://localhost:5050/DataSensor",{cantidad:cant}).then((response)=>{actualizar_arrays(response.data)});
        console.log("entro a pedir datos")
        //get(ref(db,"DatosSensores"), limitToLast(10)).then((snapshot) => {actualizar_arrays(snapshot.val())});
        onValue(query(ref(db,"DatosSensoresInterno"), limitToLast(cant)), 
        (snapshot) => {
            actualizar_arrays(snapshot.val(),true);
            console.log("use efect in bd consulting")}
        ,{ onlyOnce: true})

        onValue(query(ref(db,"DatosSensoresExterno"), limitToLast(cant)), 
        (snapshot) => {
            actualizar_arrays(snapshot.val(),false);
            console.log("use efect in bd consulting")}
        ,{ onlyOnce: true})
        
        //onValue(query(ref(db,"DatosSensores"), limitToLast(10)), (snapshot) => {actualizar_arrays(snapshot.val())});
        //console.log(GetDataSensor(cant));
        //const cuadrado = new CRUDSensors;
        //console.log(cuadrado.dataSensor);
        //actualizar_arrays(GetDataSensor(cant));
    };
    function pedirImagen(){
        //console.log("entro a pedir imagen")
        get(ref(db,"Streaming/Image")).then((snapshot) => {actualizar_imagen(snapshot.val())});
    }



    const [db,setdb]= useState(StartFirebase());

    const [VCultivoData, setCultivoData] = useState({
        labels: [''],
        datasets: [
          {
            label: "",
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: []
          }
        ]
      })
    /*setCultivoData.datasets.data(CultivoData.map((data) => data.ph));
    setCultivoData.labels(CultivoData.map((data) => data.id));*/

    /*                setCultivoData((prevState) => ({
                    ...prevState,
                    labels: ['ph'],
                    datasets:[
                        {...prevState.datasets[0],
                        data: [10]}
                    ]
                }));*/
    const [datosSensor,SetdatosSensor]=useState({

    });
    const [datosSensorExterno,SetdatosSensorExterno]=useState({

    });

    /*const [id,Setid]=useState([]);
    const [Ph,SetPh]=useState([]);
    const [Turbidez,SetTurbidez]=useState([]);
    const [Temperatura,SetTemperatura]=useState([]);
    const [Luminosidad,SetLuminosidad]=useState([]);
    const [OD,SetOD]=useState([]);
    const [Humedad,SetHumedad]=useState([]);*/
    const [imagen,setimagen]=useState("");

    const [TimeMostrado,SetTimeMostrado]=useState("None");
    const [count, setCount] = useState(80);

    /*useEffect(()=>{
        onValue(query(ref(db,"DatosSensores"), limitToLast(40)), 
        (snapshot) => {
            actualizar_arrays(snapshot.val());
            console.log("use efect in bd consulting")}
        ,{ onlyOnce: true})});*/

    useEffect(()=>{actualizarVariable(props.stateVariable,datosSensor,datosSensorExterno);console.log("render");console.log(props.stateVariable)},[props.stateVariable,datosSensor,datosSensorExterno]);

    //useEffect(()=>{const idsin=setInterval(()=>{console.log("render");actualizarVariable(props.stateVariable);},500);return ()=> clearInterval(idsin);});
    useEffect(()=>{const idsin=setInterval(()=>{if(props.stateVariable=='Video'){console.log('isvideo');pedirImagen();}},1000);return ()=> clearInterval(idsin);},[props.stateVariable]);



    //let limitt=limite;
    //console.log(VCultivoData.labels);
    function actualizarTiempo(time){
        let limitt=0;
        switch (time) {
            case "2 Meses":
                pedirdatos(720);
                break;
            case "Mes":
                pedirdatos(360);
                break;
            case "Semana":
                pedirdatos(84);
                break;
            case "Dia":
                pedirdatos(12);
                break;
            default:
                pedirdatos(720);
                break;
        }

        //setlimite(limitt);
        console.log("pedir cambiar tiempo"+time)
        SetTimeMostrado(time);
        //pedirdatos(limitt);
        
    }
    
    function actualizarVariable(button,datosSensor,datosSensorExterno){
        console.log(button);
        console.log("ACTUALIZAR");
        console.log(datosSensor);
        setCultivoData((prevState) => ({...prevState,datasets:[ {...prevState.datasets[0],label: button}]}));
        setCultivoData((prevState) => ({
            ...prevState,
            labels: datosSensor.id}));
        switch (button) {
            case "Ph":
                setCultivoData((prevState) => ({...prevState,datasets:[ {...prevState.datasets[0],data: datosSensor.Ph}]}));
                break;
            case "Turbidez":
                setCultivoData((prevState) => ({...prevState,datasets:[ {...prevState.datasets[0],data: datosSensor.Turbidez}]}));
                break;
            case "Temperatura":
                setCultivoData((prevState) => ({...prevState,datasets:[ {...prevState.datasets[0],data: datosSensor.Temperatura}]}));
                break;
            case "Luminosidad":
                setCultivoData((prevState) => ({...prevState,datasets:[ {...prevState.datasets[0],data: datosSensorExterno.Luminosidad}]}));
                setCultivoData((prevState) => ({
                    ...prevState,
                    labels: datosSensorExterno.id}));
                break;
            case "OD":
                setCultivoData((prevState) => ({...prevState,datasets:[ {...prevState.datasets[0],data: datosSensor.OD}]}));
                break;
            case "Humedad":
                setCultivoData((prevState) => ({...prevState,datasets:[ {...prevState.datasets[0],data: datosSensor.Humedad}]}));
                break;
            case "TDS":
                setCultivoData((prevState) => ({...prevState,datasets:[ {...prevState.datasets[0],data: datosSensor.TDS}]}));
                break;
          default:
            break;
        }
    };

    return(
    
    <div>

    <MVariableBar onVariableBarClicked={(Button) => { }}/>

    { props.stateVariable!='Video' ? 
    <div className='monitoreo-component-aling'>
        <div className='monitoreo-component-text'>
            <h1>Ultimo: {TimeMostrado}</h1>
            <DropdownButton id="dropdown-basic-button" title="Mostrar Ultimo">
                <Dropdown.Item onClick={() => { actualizarTiempo("Dia")}} href="#/action-1">Dia</Dropdown.Item>
                <Dropdown.Item onClick={() => { actualizarTiempo("Semana")}} href="#/action-2">Semana</Dropdown.Item>
                <Dropdown.Item onClick={() => { actualizarTiempo("Mes")}} href="#/action-3">Mes</Dropdown.Item>
                <Dropdown.Item onClick={() => { actualizarTiempo("2 Meses")}} href="#/action-4">2 Meses</Dropdown.Item>
            </DropdownButton>
        </div>
        <div style={{ width: 2000 }}>
        <LineChart chartData={VCultivoData} />
        </div>
        {/**<!-- dfd  -->
        <div>
       
        <img 
            alt='' 
            className='monitoreo-component-image'
            src='/PH.png'/>
        </div>
        */}
    </div>
    :
    <div className='monitoreo-component-image'>
   
    
    <img id='base64image' src={"data:image/jpeg;base64,"+imagen} width="600"/>
    </div>
    }
    
    </div>
    
    );
}
const mapStateToProps =(state)=>{
    return {
        stateVariable: state.uiReducer.stateVariable,
    };
  }

export default connect(mapStateToProps)(MMonitoreo)