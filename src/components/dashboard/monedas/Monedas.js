import React from 'react'
import {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {guardarMonedas} from '../../../features/monedas/MonedasSlice'



const Monedas = () => {

    const usuario = localStorage.getItem("usuario");
    const dataLog = JSON.parse(sessionStorage.getItem("DatosLog"));

    const dispatch = useDispatch();
    const monedas= useSelector(state => state.monedas.monedas)

    console.log(monedas)

    let headers = {
        "Content-Type":"application/json"
    }

    if(dataLog != null){
       headers["apikey"] =`${dataLog.apiKey}`
    } 

    useEffect(() => {
        fetch(`https://crypto.develotion.com/monedas.php`,{headers})
            .then(r => r.json())
            .then(datos => {
                  dispatch(guardarMonedas(datos))      
                  console.log(datos)       
            })
    },[]);


  return (
    <div>Monedas
         {/* {Monedas.Monedas.map(tran => <p key={tran.id}>{tran.id}</p>  ) }   */}      
        
    </div>
  )
}

export default Monedas