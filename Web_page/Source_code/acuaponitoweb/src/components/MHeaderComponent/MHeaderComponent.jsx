import{Link} from  'react-router-dom';
import './MHeaderComponent.css';
import {setShowHBar} from '../../store/actions/ui';
import {connect} from 'react-redux';

function MHeaderComponent(props){
  /*const Mensaje={Fecha:"22/4/24",Hora:"6:3", id:1213213,tipo:1,Mensaje:"pruebita funciono"}*/
  

  return(
    <div >
      { props.active ?
        <img src={`/Control/${props.img}A.svg`}  height={props.height}/>
        
      :
      <img src={`/Control/${props.img}.svg`}  height={props.height}/>
        
      }
        
    </div>
  );
}

export default MHeaderComponent;