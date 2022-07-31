import React from 'react'
import Transacciones from './transacciones/Transacciones'
import Monedas from './monedas/Monedas'



const Dashboard = () => {

    const dataLog = JSON.parse(sessionStorage.getItem("DatosLog"));
        
    
    if(dataLog != null) {
    return <div>Dashboard
            
            <Transacciones/>
            <Monedas/> 

        </div> 
    } else {
        return <div>Dashboard </div>
    }  
  
}

export default Dashboard