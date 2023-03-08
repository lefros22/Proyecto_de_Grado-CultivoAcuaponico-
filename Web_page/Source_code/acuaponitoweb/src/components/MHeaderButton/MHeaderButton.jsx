import{Link} from  'react-router-dom';
import './MHeaderButton.css';
import {setShowHBar} from '../../store/actions/ui';
import {connect} from 'react-redux';

function MHeaderButton(props){
  function onButtonClick(button){
    console.log(button);
    console.log("on button clicked");
    switch (button) {
      case "INICIA SESION":
        props.onButtonLoginClick()
        break;
      case "CERRAR SESIÓN":
        props.onButtonExitClick()
      default:
        props.onButtonStateClick()
        break;
    }

    /*props.setShowHBar(false);*/
    /*props.onLoginClick();*/
  }
  

  return(
    <button className="mHeaderButton" onClick={() => { onButtonClick(props.buttonName)}}>
      { props.active?
      props.to ?
          <Link to={props.to} className='mHeaderButton-text-active'>
            {props.buttonName}
          </Link>
          :
          <span className='mHeaderButton-text-active'>
            { props.buttonName }
          </span>
      :
      props.to ?
          <Link to={props.to} className='mHeaderButton-text'>
            {props.buttonName}
          </Link>
          :
          <span className='mHeaderButton-text'>
            { props.buttonName }
          </span>
      }
    </button>
  );
}

const mapStateToProps =(state)=>{
  return {
    statePage: state.uiReducer.statePage,
  };
}
export default connect(mapStateToProps)(MHeaderButton);