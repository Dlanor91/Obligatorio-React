import React from 'react'
import { useSelector} from 'react-redux'
import Table from 'react-bootstrap/Table';

const TablaMoneda = () => {

    const transacciones = useSelector(state => state.transacciones.transacciones);
    const monedas = useSelector(state => state.monedas.monedas);
        
    const filtarTrans = (id,cot,nombre) =>{
        const filtro = transacciones.findLast(t => t.moneda == id);  
        console.log(filtro);             
        const ultimaMoneda = {
            id:id,            
            cotizacionActual: cot,
            nombre: nombre,
            cotizacionAnterior: (filtro == undefined)?"-":filtro.valor_actual,
            IA: (filtro == undefined)?"Sin acciones":(cot>filtro.valor_actual)? "Vender": "Comprar"
        }               
        return ultimaMoneda;
    } 
   const datos = monedas.map((idM) =>(filtarTrans(idM.id,idM.cotizacion,idM.nombre)) ) 

   //console.log(datos)

    if (monedas.length !== 0) {
        return (
            <>
            <div className='px-2 m-5'>
                 
                <h2 className='' style={{color:"white",backgroundColor:"gray"}}>Monedas</h2>
                
                <Table striped variant="dark">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cotizacion Actual</th>
                            <th>Cotizacion Anterior</th>
                            <th>Recomendacion</th>
                        </tr>
                    </thead>
                    <tbody>                    
                        {datos.map((dato, index) => {
                            return (                                
                                <tr key={index}>
                                    <td>{dato.nombre}</td>                                    
                                    <td>{dato.cotizacionActual}</td>
                                    <td>{dato.cotizacionAnterior}</td> 
                                   <td>{dato.IA}</td>                              
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

            </div>
            </>
        )
    } else {
        <div> No hay conexion</div>
    }
}

export default TablaMoneda