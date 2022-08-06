import React from 'react'
import { useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Table from 'react-bootstrap/Table';
import MontoFinal from '../montoTotal/MontoFinal';
import { guardarMonedas } from "../../../features/monedas/MonedasSlice";
import { apiMonedas } from "../../../services/ServiciosApi";
import IngresarTransaccion from '../transacciones/IngresarTransaccion'

const TablaMoneda = () => {

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log("hola")
    //         cargarMonedas();
    //     }, 10000);
    //     return () => clearInterval(interval);
    // }, []);

    const monedas = useSelector(state => state.monedas.monedas)

    
    // const cargarMonedas = async () => {
    //     try {
    //         const monedas = await apiMonedas();
    //         dispatch(guardarMonedas(monedas.monedas));
    //     } catch (error) {
    //         alert(error);
    //     }
    // }

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