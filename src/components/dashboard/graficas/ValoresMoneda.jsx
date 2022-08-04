import React from 'react'
import Grafica from './Grafica'
import { useState } from 'react'

const ValoresMoneda = () => {
    const [data, setData] = useState({datos: [5,6,7,], categorias: ["Compra","Venta","Compra"]})

    return (
     <Grafica {...data}/>
    )
}

export default ValoresMoneda