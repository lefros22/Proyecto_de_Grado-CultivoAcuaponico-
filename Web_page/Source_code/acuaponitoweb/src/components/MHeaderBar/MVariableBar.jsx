import React, { Component } from 'react';
import{useState} from 'react';
import './MVariableBar.css';

import MVariableButton from '../MHeaderButton/MVariableButton';

import{ connect } from 'react-redux';
import {setVariable} from '../../store/actions/ui';

function MVariableBar(props) {
  /*function onHeaderBarLoginClick() {
    console.log("on login clicked in header bar!");
    props.onHeaderBarLoginClicked();
  }*/
  /**const[showHeaderBar]=useState(true);*/
  const showHeaderBar=true;
  function onVariableBarClick(Button){
    console.log(Button);
    props.setVariable(Button)
    props.onVariableBarClicked(Button)

    /*comprobar cosas bla bla*/
    /*todo bien entonces activar header bar*/
    

  }
  return(
    <div>
    { 
      showHeaderBar ?
    <div>
    <nav className='mVariableBar-navbar'>
    <div className='mVariableBar-Container'>
        <MVariableButton onButtonVariableClick={(Button) => { onVariableBarClick(Button)}} buttonName="Temperatura" active={"Temperatura"==props.stateVariable}/>
        <MVariableButton onButtonVariableClick={(Button) => { onVariableBarClick(Button)}} buttonName="TDS" active={"TDS"==props.stateVariable}/>
        <MVariableButton onButtonVariableClick={(Button) => { onVariableBarClick(Button)}} buttonName="Luminosidad" active={"Luminosidad"==props.stateVariable}/>
        <MVariableButton onButtonVariableClick={(Button) => { onVariableBarClick(Button)}} buttonName="Video" active={"Video"==props.stateVariable}/>
        {/*
        <MVariableButton onButtonVariableClick={(Button) => { onVariableBarClick(Button)}} buttonName="Ph" active={"Ph"==props.stateVariable}/>
        <MVariableButton onButtonVariableClick={(Button) => { onVariableBarClick(Button)}} buttonName="Turbidez" active={"Turbidez"==props.stateVariable}/>


        <MVariableButton onButtonVariableClick={(Button) => { onVariableBarClick(Button)}} buttonName="OD" active={"OD"==props.stateVariable}/>
        <MVariableButton onButtonVariableClick={(Button) => { onVariableBarClick(Button)}} buttonName="Humedad" active={"Humedad"==props.stateVariable}/>*/}

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
    stateVariable: state.uiReducer.stateVariable
  };
}
const mapActionsToProps ={
  setVariable
}
export default connect(mapStateToProps,mapActionsToProps)(MVariableBar);