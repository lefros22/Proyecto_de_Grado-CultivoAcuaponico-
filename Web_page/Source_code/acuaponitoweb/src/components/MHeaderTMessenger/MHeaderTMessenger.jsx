import{Link} from  'react-router-dom';
import MHeaderMessage from '../MHeaderMessage/MHeaderMessage';
import {setShowHBar} from '../../store/actions/ui';
import {connect} from 'react-redux';
import './MHeaderTMessenger.css';


function MHeaderTMessenger(props){
  /*const Mensaje={Fecha:"22/4/24",Hora:"6:3", id:1213213,tipo:1,Mensaje:"pruebita funciono"}*/
    return(
    <div className="MHeaderTMessenger" >
        <MHeaderMessage Mensaje={props.Mensajes[0]}/>
        <MHeaderMessage Mensaje={props.Mensajes[1]}/>
        <MHeaderMessage Mensaje={props.Mensajes[2]}/>
        <MHeaderMessage Mensaje={props.Mensajes[3]}/>
        <MHeaderMessage Mensaje={props.Mensajes[4]}/>
        <MHeaderMessage Mensaje={props.Mensajes[5]}/>

    </div>
  );
}

export default MHeaderTMessenger;