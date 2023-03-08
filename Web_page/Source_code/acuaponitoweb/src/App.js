import logo from './logo.svg';
import './App.css';
import MLoginRegister from './components/MLoginRegister/MLoginRegister'
import MHeaderBar from './components/MHeaderBar/MHeaderBar'
import MHome from './pages/MHome/MHome'
import MMonitoreo from './pages/MMonitoreo/MMonitoreo'
import 'bootstrap/dist/css/bootstrap.min.css';

import MControl from './pages/MControl/MControl'
import MCultivo from './pages/MCultivo/MCultivo'

import {Routes,Route,Navigate} from 'react-router-dom';
import{ connect } from 'react-redux';

import axios from 'axios';

import {useEffect} from 'react'

import {setControl,setActuator} from './store/actions/ui';



function App(props) {
  useEffect(()=>{
    /* HTTP DE PRUEBA
    axios.get("http://localhost:5050/user").then((response)=>{
      console.log(response)
    });

    axios.post("http://localhost:5050/pponer",{tit:'fdsf',mensaje:'lalalal'}).then((response)=>{
      console.log(response)
    });

    setInterval(()=>{console.log("shi funciona")},3000);*/
    //Carga de valores iniciales


  });
  
  return (
    <div>
      {props.showBar?
        <MHeaderBar />
        :
        null
      }
      
      {/*<div className='app-mLoginRegister-container'> <MLoginRegister/></div>*/}
      <Routes>
        <Route exact path='/' element={<MHome/>}/>
        
        <Route exact path='/Monitoreo' element={props.showBar?<MMonitoreo/>:<Navigate to="/" />}/>
        <Route exact path='/Control' element={props.showBar?<MControl/>:<Navigate to="/" />}/>
        <Route exact path='/Cultivo' element={props.showBar?<MCultivo/>:<Navigate to="/" />}/>
        
      </Routes>
    
    </div>
  );
  
}

const mapStateToProps =(state)=>{
  return {
    showBar: state.uiReducer.showBar,
  };
}


const mapActionsToProps ={
  setControl,setActuator
  }
export default connect(mapStateToProps,mapActionsToProps)(App);
