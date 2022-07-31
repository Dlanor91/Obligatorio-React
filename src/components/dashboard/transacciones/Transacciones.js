import React from 'react'
import {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {guardarTransacciones} from '../../../features/transacciones/TransaccionesSlice'
import Table from 'react-bootstrap/Table';


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
   
    useEffect(() => {
        fetch(`https://crypto.develotion.com/transacciones.php?idUsuario=${dataLog.id}`,{headers})
            .then(r => r.json())
            .then(datos => {

                switch (datos.codigo) {
                    case 200:
                        dispatch(guardarTransacciones(datos))  
                        break;              
                    default:
                        break;
                }
                      
                  console.log(datos)       
            })
    },[]);

    if(transacciones.length !== 0){
        return (
            <div>Transacciones

        <Table striped bordered hover>
            <thead>
                <tr>
                <th>N° Transaccion</th>
                <th>Moneda</th>
                <th>Tipo de Operacion</th>
                <th>Cantidad</th>
                <th>Valor Moneda</th>
                </tr>
            </thead>
            <tbody>
            {transacciones.transacciones.map( (tran,index) => {
                return (
                    <tr key= {index}>
                    <td>{tran.id}</td>
                    <td>{tran.moneda}</td>
                    <td>{tran.tipo_operacion}</td>
                    <td>{tran.cantidad}</td>
                    <td>{tran.valor_actual}</td>
                    </tr>    
                )    
            })}      
            </tbody>
            </Table>
            
            </div>
        )
    } else {
        <div> Transacciones</div>
    }
}

export default Transacciones