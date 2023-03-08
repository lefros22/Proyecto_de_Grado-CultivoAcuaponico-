

import './MCultivo.css';
import { useState } from 'react';
import MLoginRegister from '../../components/MLoginRegister/MLoginRegister'
import MHeaderBar from '../../components/MHeaderBar/MHeaderBar'

function Cultivo() {
    
    return(
        <div>
        
        <div className='cultivo-component-aling'> 
            <img 
                alt='image' 
                className='cultivo-component-image'
                src='/MiCultivo.png'/>
            
            <div className='cultivo-component-text'>
            <body>
                <p>Ubicacion: Javeriana Cali</p>
                <p>Caracteristicas: Suelo de sustratos, 2 niveles de cultivo 0,5m2 c/u, Pecera de 100lt</p>
                <p>Variables Sensadas: Temperatura de agua, Luminosidad y TDS</p>
                <p>Actuadores: Bombas de agua, Bomba de aire, Luz Artificial, Ventilacion</p>

            </body>
            </div>
        </div>
        </div>
    );
}

export default Cultivo