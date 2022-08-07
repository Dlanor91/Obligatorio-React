import React from 'react'
import { useSelector} from 'react-redux'
import Table from 'react-bootstrap/Table';

const TablaMoneda = () => {

    const transacciones = useSelector(state => state.transacciones.transacciones);
    const monedas = useSelector(state => state.monedas.monedas);
        
    const filtarTrans = (id) =>{
        const filtro = transacciones.findLast(t => t.moneda == id);
        return filtro;
    } 
   const datos = monedas.map((idM) =>(filtarTrans(idM.id)) ) 
    console.log(datos)
    
    if (monedas.length !== 0) {
        return (
            <div className='px-2 m-5'>
                 
                <h2 className=''>Monedas</h2>
                
                <Table striped variant="dark">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cotizacion</th>
                            <th>IA</th>
                        </tr>
                    </thead>
                    <tbody>                    
                        {monedas.map((mon, index) => {
                            return (                                
                                <tr key={index}>
                                    <td>{mon.nombre}</td>                                    
                                    <td>{mon.cotizacion}</td> 
                                   <td>Aqui</td>                                
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>

            </div>
        )
    } else {
        <div> No hay conexion</div>
    }
}

export default TablaMoneda