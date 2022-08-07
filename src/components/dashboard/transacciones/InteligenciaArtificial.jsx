import React from 'react'
import { useSelector } from 'react-redux'

export const InteligenciaArtificial = () => {

    const transacciones = useSelector(state => state.transacciones.transacciones);
    const monedas = useSelector(state => state.monedas.monedas);
    const auxMonedas = monedas.map(m => m.id);
    
    const filtarTrans = (a) =>{
        const filtro = transacciones.findLast(t => t.moneda == a);        
        console.log(filtro)
        return filtro;
    } 
   const datos = monedas.map((idM) =>(filtarTrans(idM.id)) ) 
    
   /* const ultimaTran = transacciones[transacciones.length - 1]
    const ultimaTran = transacciones[transacciones.length - 1]

    const buscarTranMoneda = transacciones.filter((t, indice) => t.moneda === 2)

    const mon = monedas.find(m => m.id === ultimaTran.moneda)
    const idMonedas = monedas.map(m => m.id); */
    return (

        <div>{/* {mon.cotizacion > ultimaTran.valor_actual ? "Compra" : "Venta"} */}
            <div>InteligenciaArtificial</div>
        </div>



    )
}

