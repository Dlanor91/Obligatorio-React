import React from 'react'
import Grafica from './Grafica'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const GraficoCompras = () => {
  const transacciones = useSelector(state => state.transacciones.transacciones);
  const monedas = useSelector(state => state.monedas.monedas);  
  
  const [datos, setDatos] = useState([5,10,12])
  console.log(datos)
  const [categorias, setCategorias] = useState(["Pueblo","Casa","Rio"]);
  console.log(categorias)
  const [data, setData] = useState({datos: datos, categorias:categorias})

  return (
   <Grafica {...data}/>
  )
}

export default GraficoCompras