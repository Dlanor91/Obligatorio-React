import React from 'react'
import { useSelector } from 'react-redux';
const MontoFinal = () => {

  const transacciones = useSelector(state => state.transacciones.transacciones);    
  const monedas = useSelector(state => state.monedas.monedas)
  
  const montoTotal =()=>{
    const total =0;
    /* transacciones.transacciones.map(trans => { (trans.tipo_operacion ==2)? 
        total+=trans.cantidad*trans.valor_actual:
        total-=trans.cantidad*trans.valor_actual
    }); */
  }
  
  return (
    <div className='text-align:left'>
        El Monto Final es de: $ {montoTotal()} 
    </div>
  )
}

export default MontoFinal