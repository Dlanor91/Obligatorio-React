import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { guardarMonedas } from '../../../features/monedas/MonedasSlice'

const Monedas = () => {
   
    return (
        <div>Monedas
            {/* {Monedas.Monedas.map(tran => <p key={tran.id}>{tran.id}</p>  ) }   */}

        </div>
    )
}

export default Monedas