import React from 'react'
import { useSelector} from 'react-redux'
import Table from 'react-bootstrap/Table';

const TablaMoneda = () => {

    const monedas = useSelector(state => state.monedas.monedas)

    if (monedas.length !== 0) {
        return (
            <div className='px-2 m-5'>
                 
                <h2 className=''>Monedas</h2>
                
                <Table striped variant="dark">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Cotizacion</th>
                        </tr>
                    </thead>
                    <tbody>                    
                        {monedas.map((mon, index) => {
                            return (                                
                                <tr key={index}>
                                    <td>{mon.nombre}</td>                                    
                                    <td>{mon.cotizacion}</td>
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