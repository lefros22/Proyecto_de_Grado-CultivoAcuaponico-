
import MHeaderComponent from '../MHeaderComponent/MHeaderComponent';
import {connect} from 'react-redux';
import './MHeaderDiagramControl.css';
import {setControl,setActuator} from '../../store/actions/ui';
import ReactTooltip from 'react-tooltip';


import {useEffect} from 'react'
import axios from 'axios';

function MHeaderDiagramControl(props){

      /*const Mensaje={Fecha:"22/4/24",Hora:"6:3", id:1213213,tipo:1,Mensaje:"pruebita funciono"}
  style="position:absolute;top:0px;left:0px;right:0px;bottom:0px;
  
  
  <div className="background posButton"><MHeaderComponent height="40" img="ControlButon"/></div>
  <div className="background posValve1"><MHeaderComponent height="40" img="Valve"/></div>
  
 */
    /*const */



    function CambiarEstadoBD(state){
        axios.post("http://localhost:5050/CambiarStateControl",{val:state}).then((response)=>{});
    };


    function onPruebitaclick(){
        console.log("yes")
    }
    function onStateActuator(actuator){
        console.log(props.stateActuator)

        if (props.stateControl=="Manual"){
            const pap= props.stateActuator;
            switch (actuator) {
                case "Valve1":
                    props.setActuator({...pap,Valve1:!pap.Valve1} )
                    break;
                case "Valve2":
                    props.setActuator({...pap,Valve2:!pap.Valve2} )
                    break;
                case "ValveIn":
                    props.setActuator({...pap,ValveIn:!pap.ValveIn} )
                    break;
                case "Humidifer1":
                    props.setActuator({...pap,Humidifer1:!pap.Humidifer1} )
                    break;
                case "Humidifer2":
                    props.setActuator({...pap,Humidifer2:!pap.Humidifer2} )
                    break;
                case "Lamp1":
                    props.setActuator({...pap,Lamp1:!pap.Lamp1} )
                    break;
                case "Lamp2":
                    props.setActuator({...pap,Lamp2:!pap.Lamp2} )
                    break;
                case "Peristaltic1":
                    props.setActuator({...pap,Peristaltic1:!pap.Peristaltic1} )
                    break;
                case "Peristaltic2":
                    props.setActuator({...pap,Peristaltic2:!pap.Peristaltic2} )
                    break;
                case "WaterPump1":
                    props.setActuator({...pap,WaterPump1:!pap.WaterPump1} )
                    break;
                case "WaterPump2":
                    props.setActuator({...pap,WaterPump2:!pap.WaterPump2} )
                    break;
                case "Fan":
                    props.setActuator({...pap,Fan:!pap.Fan} )
                    break;
                case "Feeder":
                    props.setActuator({...pap,Feeder:!pap.Feeder} )
                    break; 
                case "AirPump":
                    props.setActuator({...pap,AirPump:!pap.AirPump} )
                    break;  
                default:
                    break;
            }
        }
        switch (actuator) {
            case "ButtonManual":
                props.setControl("Manual");
                //CambiarEstadoBD("Manual");
                break;
            case "ButtonAutomatico":
                props.setControl("Automatico");
                //CambiarEstadoBD("Automatico");
                break;
            case "ButtonPemergencia":
                props.setActuator({
                    Valve1: false,
                    Valve2: false,
                    ValveIn: false,
                    Humidifer1: false,
                    Humidifer2: false,
                    Lamp1: false,
                    Lamp2: false,
                    Peristaltic1: false,
                    Peristaltic2: false,
                    WaterPump1: false,
                    WaterPump2: false,
                    Fan: false,
                    Feeder: false,
                    AirPump: false})
                props.setControl("Pemergencia")
                //CambiarEstadoBD("Pemergencia");
                break;
            default:
                break;
        
        }
        console.log(props.stateActuator)
    }
    return(
    <div className="mHeaderDiagramControl" >
        <div className="background" ><MHeaderComponent height="450" img="FondoNewVersion3"/></div>
        <ReactTooltip place="top" type='dark' effect="solid"/>
        
        {/*<button data-tip="Valve1" className="Actuator posValve1" onClick={()=>{onStateActuator("Valve1")}}><MHeaderComponent height="29" img="Valve" active={props.stateActuator.Valve1} name='Valve1' /></button >
        <button data-tip="Valve2" className="Actuator posValve2" onClick={()=>{onStateActuator("Valve2")}}><MHeaderComponent height="29" img="Valve" active={props.stateActuator.Valve2} name='Valve2' /></button>
        <button data-tip="Valve3" className="Actuator posValve3" onClick={()=>{onStateActuator("Valve3")}}><MHeaderComponent height="29" img="Valve" active={props.stateActuator.Valve3} name='Valve3' /></button>
        <button data-tip="Valve4" className="Actuator posValve4" onClick={()=>{onStateActuator("Valve4")}}><MHeaderComponent height="29" img="Valve" active={props.stateActuator.Valve4} name='Valve4' /></button>*/}
        <button data-tip="Valve1" className="Actuator posValve1" onClick={()=>{onStateActuator("Valve1")}}><MHeaderComponent height="27" img="Valve" active={props.stateActuator.Valve1} name='Valve1' /></button>
        <button data-tip="ValveIn" className="Actuator posValveIn" onClick={()=>{onStateActuator("ValveIn")}}><MHeaderComponent height="27" img="Valve" active={props.stateActuator.ValveIn} name='ValveIn' /></button>
        <button data-tip="Valve2" className="Actuator posValve2" onClick={()=>{onStateActuator("Valve2")}}><MHeaderComponent height="27" img="Valve" active={props.stateActuator.Valve2} name='Valve2' /></button>

        <button data-tip="Humidifer1" className="Actuator posHumidifer1" onClick={()=>{onStateActuator("Humidifer1")}}><MHeaderComponent height="25" img="Humidifer" active={props.stateActuator.Humidifer1} name="Humidifer1" /></button>
        <button data-tip="Humidifer2" className="Actuator posHumidifer2" onClick={()=>{onStateActuator("Humidifer2")}}><MHeaderComponent height="25" img="Humidifer" active={props.stateActuator.Humidifer2} name="Humidifer2" /></button>

        <button data-tip="Lamp1" className="Actuator posLamp1" onClick={()=>{onStateActuator("Lamp1")}}><MHeaderComponent height="25" img="Lamp" active={props.stateActuator.Lamp1} name="Lamp1" /></button>
        <button data-tip="Lamp2" className="Actuator posLamp2" onClick={()=>{onStateActuator("Lamp2")}}><MHeaderComponent height="25" img="Lamp" active={props.stateActuator.Lamp2} name="Lamp2" /></button>
    
        <button data-tip="PeristalticPump1" className="Actuator posPeristalticPump1" onClick={()=>{onStateActuator("Peristaltic1")}}><MHeaderComponent height="27" img="PeristalticPump" active={props.stateActuator.Peristaltic1} name="Peristaltic1" /></button>
        <button data-tip="PeristalticPump2" className="Actuator posPeristalticPump2" onClick={()=>{onStateActuator("Peristaltic2")}}><MHeaderComponent height="27" img="PeristalticPump" active={props.stateActuator.Peristaltic2} name="Peristaltic2" /></button>

        <button data-tip="WaterPump1" className="Actuator posWaterPump1" onClick={()=>{onStateActuator("WaterPump1")}}><MHeaderComponent height="27" img="WaterPump" active={props.stateActuator.WaterPump1} name="WaterPump1" /></button>
        <button data-tip="WaterPump2" className="Actuator posWaterPump2" onClick={()=>{onStateActuator("WaterPump2")}}><MHeaderComponent height="27" img="WaterPump" active={props.stateActuator.WaterPump2} name="WaterPump2" /></button>

        <button data-tip="Fan" className="Actuator posFan" onClick={()=>{onStateActuator("Fan")}}><MHeaderComponent height="27" img="Fan" active={props.stateActuator.Fan} name="Fan" /></button>
        <button data-tip="Feeder" className="Actuator posFeeder" onClick={()=>{onStateActuator("Feeder")}}><MHeaderComponent height="27" img="Feeder" active={props.stateActuator.Feeder} name="Feeder" /></button>
        <button data-tip="AirPump" className="Actuator posAirPump" onClick={()=>{onStateActuator("AirPump")}}><MHeaderComponent height="30" img="AirPump" active={props.stateActuator.AirPump} name="AirPump" /></button>

        <button className="Button posButtonGray1" onClick={()=>{onStateActuator("ButtonAutomatico")}}><MHeaderComponent height="67" img="ButtonGray" active={props.stateControl==='Automatico'} name="Automatico" /></button>
        <button className="Button posButtonGray2" onClick={()=>{onStateActuator("ButtonManual")}}><MHeaderComponent height="67" img="ButtonGray" active={props.stateControl==='Manual'} name="Manual" /></button>
        <button className="Button posButtonRed" onClick={()=>{onStateActuator("ButtonPemergencia")}}><MHeaderComponent height="67" img="ButtonRed" active={props.stateControl==='Pemergencia'} name="Pemergencia" /></button>

        <div className="Object posLED1"><MHeaderComponent height="17" img="LED" active={props.stateControl==='Automatico'}/></div>
        <div className="Object posLED2"><MHeaderComponent height="17" img="LED" active={props.stateControl==='Manual'}/></div>
        <div className="Object posLED3"><MHeaderComponent height="17" img="LED" active={props.stateControl==='Pemergencia'}/></div>

        <div className='Object text posText1'>Automatico</div>
        <div className='Object text posText2'>Manual</div>
        <div className='Object text posText3'>Parada de emergencia</div>

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

export default connect(mapStateToProps,mapActionsToProps)(MHeaderDiagramControl);