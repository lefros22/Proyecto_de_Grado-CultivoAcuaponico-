import{Link} from  'react-router-dom';
import './MHeaderMessage.css';
import {setShowHBar} from '../../store/actions/ui';
import {connect} from 'react-redux';

function MHeaderMessage(props){
  /*const Mensaje={Fecha:"22/4/24",Hora:"6:3", id:1213213,tipo:1,Mensaje:"pruebita funciono"}*/
  

  return(
    <div className="mHeaderMessage" >
        <div className="mHeaderMessage-Head">
            <div className="mHeaderMessage-Text">
            ID: {props.Mensaje.id} 
            </div>
            <div className="mHeaderMessage-Text">
            Fecha: {props.Mensaje.Fecha.split(',')[0]} 
            </div>
            <div className="mHeaderMessage-Text">
            Hora: {props.Mensaje.Fecha.split(',')[1]} 
            </div>
        </div>
    
        <div className="mHeaderMessage-Body">
        {props.Mensaje.Descripcion} 
        </div>
    </div>
  );
}

export default MHeaderMessage;