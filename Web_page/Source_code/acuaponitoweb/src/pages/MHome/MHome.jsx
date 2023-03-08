import './MHome.css';
import { useState } from 'react';
import MLoginRegister from '../../components/MLoginRegister/MLoginRegister'
import MHeaderBar from '../../components/MHeaderBar/MHeaderBar'

function Home() {
    
    return(
        <div className='back'>
        {/*<div style={{backgroundImage: `url('/background.jpg')`}}></div>*/}
        
           
        <div className='home-mLoginRegister-container'> <MLoginRegister/></div>
        </div>
        
    );
}

export default Home