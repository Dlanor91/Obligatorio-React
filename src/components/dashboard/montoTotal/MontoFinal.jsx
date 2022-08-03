import React from 'react'
import { useSelector } from 'react-redux';
const MontoFinal = () => {

  const transacciones = useSelector(state => state.transacciones.transacciones);    
  const monedas = useSelector(state => state.monedas.monedas)

  return (
    <div>
        El monto Final es de: 
    </div>
  )
}

export default MontoFinal