import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { guardarTransacciones } from '../../../features/transacciones/TransaccionesSlice'
import Table from 'react-bootstrap/Table';
import Monedas from '../../../components/dashboard/monedas/Monedas'

const Transacciones = () => {

    const usuario = localStorage.getItem("usuario");
    const dataLog = JSON.parse(sessionStorage.getItem("DatosLog"));
    const dispatch = useDispatch();
    const transacciones = useSelector(state => state.transacciones.transacciones)
    
    let headers = {
        "Content-Type": "application/json"
    }

    if (dataLog != null) {
        headers["apikey"] = `${dataLog.apiKey}`
    }

    useEffect(() => {
        fetch(`https://crypto.develotion.com/transacciones.php?idUsuario=${dataLog.id}`, { headers })
            .then(r => r.json())
            .then(datos => {

                switch (datos.codigo) {
                    case 200:
                        dispatch(guardarTransacciones(datos))
                        break;
                    default:
                        break;
                }
            })
    }, []);

    if (transacciones.length !== 0) {
        return (
            <div className='px-2'>
                <h2 className='mt-2'>Transacciones</h2>
                <Table striped bordered hover variant="light">
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
                        {transacciones.transacciones.map((tran, index) => {
                            return (
                                <tr key={index}>
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