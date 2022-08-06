import React from 'react'
import { useSelector } from 'react-redux'

export const InteligenciaArtificial = () => {

    const monedas = useSelector(state => state.monedas.monedas)
    const transacciones = useSelector(state => state.transacciones.transacciones);
    const ultimaTran = transacciones[transacciones.length - 1]

    const buscarTranMoneda = transacciones.filter((t, indice) => t.moneda === 2)

    const mon = monedas.find(m => m.id === ultimaTran.moneda)
    const idMonedas = monedas.map(m => m.id);

    return (

        <div>{mon.cotizacion > ultimaTran.valor_actual ? "Compra" : "Venta"}
            <div>InteligenciaArtificial</div>
        </div>



    )
}

