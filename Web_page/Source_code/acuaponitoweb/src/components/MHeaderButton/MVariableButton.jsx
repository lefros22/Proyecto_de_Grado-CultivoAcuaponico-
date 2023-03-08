import{Link} from  'react-router-dom';
import './MVariableButton.css';
import {setShowHBar} from '../../store/actions/ui';
import {connect} from 'react-redux';

function MVariableButton(props){
  function onButtonClick(button){
    console.log(button);
    console.log("on button variable clicked");
    props.onButtonVariableClick(button)
    /*props.setShowHBar(false);*/
    /*props.onLoginClick();*/
  }
  

  return(
    <button className="mVariableButton" onClick={() => { onButtonClick(props.buttonName)}}>
      { props.active ?
        <a
          
          className='mVariableButton-text-active'
          href={props.href}>
            { props.buttonName }
          </a>
          :
          <span className='mVariableButton-text'>
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
export default connect(mapStateToProps)(MVariableButton);