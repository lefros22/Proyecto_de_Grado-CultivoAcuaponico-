import{useState} from 'react';
import './MLoginRegister.css';

import MHeaderButton from '../MHeaderButton/MHeaderButton';
import {connect} from 'react-redux';
import {setShowHBar,setState} from '../../store/actions/ui';

function MLoginRegister(props) {
  const[showRegister,setShowRegister]=useState(false);
  const[User,setUser]=useState("");
  const[Pasword,setPasword]=useState("");
  const[Validate,setValidate]=useState(true);

  const userCred="luisykaren";
  const paswordCred="luismanda";

  function onLoginClick(){
    console.log("on login clicked");
    /*comprobar cosas bla bla*/
    /*todo bien entonces activar header bar*/

    if(userCred==User && paswordCred==Pasword){
    props.setState("Cultivo");
    props.setShowHBar(true);}

  }
  function inputUser(event) {
    console.log(event.target.value)
    setUser(event.target.value)
    //if(userCred==User && paswordCred==Pasword){setValidate(true)}
  }


  function inputPasword(event) {
    console.log(event.target.value)
    setPasword(event.target.value)
    //if(userCred==User && paswordCred==Pasword){setValidate(true)}
  }
  return(
    <div className='mLoginRegister-container'>
      
      <button className='mLoginRegister-logo' >
      <img 
          alt='app-logo' 
          className='mHeaderBar-logo'
          src='/pez1.png'/>
      </button>
      {
        !showRegister ?
        <div className='mLoginRegister-input-container'>
          <input 
            className='mLoginRegister-input'
            placeholder='Usuario'
            type='text'
            onChange={inputUser}/>
          <input
            className='mLoginRegister-input'
            placeholder='Contraseña' 
            type='password'
            onChange={inputPasword}/>
          <div className='mLoginRegister-password-help-container'>
            <button className='mLoginRegister-password-help'>
              Ayuda con la contraseña
            </button>
          </div>
          <div className='mLoginRegister-action-button-container'>
            <button className='mLoginRegister-action-button'>
              <MHeaderButton onButtonLoginClick={() => { onLoginClick()}}
              buttonName="INICIA SESION" to='/Cultivo'/>
            </button>
          </div>
        </div>
        :
        <div className='mLoginRegister-input-container'>
          <input 
            className='mLoginRegister-input'
            placeholder='Ingresa el nombre de tu jugador'/>
          <input
            className='mLoginRegister-input'
            placeholder='Ingresa tu dirección de correo electrónico'/>
          <input 
            className='mLoginRegister-input'
            placeholder='Ingresa tu contraseña'/>
          <div className='mLoginRegister-action-button-container'>
            <button className='mLoginRegister-action-button'>
              REGÍSTRATE
            </button>
          </div>
        </div>
      }
    </div>
  );
  
}

const mapActionsToProps ={
  setShowHBar,
  setState
}

export default connect(null,mapActionsToProps)(MLoginRegister);