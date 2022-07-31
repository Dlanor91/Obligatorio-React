import React from 'react'
import {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {guardarTransacciones} from '../../../features/transacciones/TransaccionesSlice'



const Transacciones = () => {

    const usuario = localStorage.getItem("usuario");
    const dataLog = JSON.parse(sessionStorage.getItem("DatosLog"));
    const dispatch = useDispatch();
    const transacciones= useSelector(state => state.transacciones.transacciones)

    console.log(transacciones)

    let headers = {
        "Content-Type":"application/json"
    }

    if(dataLog != null){
        headers["apikey"] =`${dataLog.apiKey}`
    } 
    console.log(dataLog.apiiKey)
    useEffect(() => {
        fetch(`https://crypto.develotion.com/transacciones.php?idUsuario=${dataLog.id}`,{headers})
            .then(r => r.json())
            .then(datos => {
                  dispatch(guardarTransacciones(datos))      
                  console.log(datos)       
            })
    },[]);


  return (
    <div>Transacciones
         {/* {transacciones.transacciones.map(tran => <p key={tran.id}>{tran.id}</p>  ) }   */}
         
        

        
    </div>
  )
}

export default Transacciones