import React, { Component } from 'react';
import{useState} from 'react';
import './MHeaderBar.css';

import MHeaderButton from '../MHeaderButton/MHeaderButton';

import{ connect } from 'react-redux';
import {setState,setShowHBar} from '../../store/actions/ui';

function MHeaderBar(props) {
  /*function onHeaderBarLoginClick() {
    console.log("on login clicked in header bar!");
    props.onHeaderBarLoginClicked();
  }*/
  /**const[showHeaderBar]=useState(true);*/
  const showHeaderBar=true;
  function onExitClick(){
    console.log("on exit clicked");
    /*comprobar cosas bla bla*/
    /*todo bien entonces activar header bar*/
    props.setShowHBar(false);
    props.setState('login');

  }
  function onStateBarClick(butt){
    console.log("on state clicked");
    console.log(butt);
    /*comprobar cosas bla bla*/
    /*todo bien entonces activar header bar*/
    props.setState(butt);


  }

  return(
    <div>
    { 
      showHeaderBar ?
    <div>
    <nav className='mHeaderBar-navbar'>
     
      
      <div className='mHeaderBar-leftContainer'>
        
        <img 
          alt='app-logo' 
          className='mHeaderBar-logo'
          src='/pez2.png'/>
        <MHeaderButton onButtonStateClick={(Button) => { onStateBarClick("Cultivo")}} buttonName="MI CULTIVO" to='/Cultivo' active={"Cultivo"==props.statePage}/>
        <MHeaderButton onButtonStateClick={(Button) => { onStateBarClick("Monitoreo")}} buttonName="MONITOREO" to='/Monitoreo' active={"Monitoreo"==props.statePage}/>
        <MHeaderButton onButtonStateClick={(Button) => { onStateBarClick("Control")}} buttonName="CONTROL" to='/Control' active={"Control"==props.statePage}/>
      </div>
      <div className='mHeaderBar-rightContainer'>
        <MHeaderButton onButtonExitClick={() => { onExitClick()}}
        buttonName="CERRAR SESIÓN" to='/' />
      </div>
    
    </nav></div>
    :
    <div></div>
    }
    </div>
  );

  
  
}

const mapStateToProps =(state)=>{
  return {
    showBar: state.uiReducer.showBar,
    text: state.uiReducer.text,
    statePage: state.uiReducer.statePage
  };
}
const mapActionsToProps ={
  setState,
  setShowHBar
}
export default connect(mapStateToProps,mapActionsToProps)(MHeaderBar);