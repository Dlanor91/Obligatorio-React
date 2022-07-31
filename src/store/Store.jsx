import { configureStore } from "@reduxjs/toolkit";

import transaccionesReducer from '../features/transacciones/TransaccionesSlice'
import monedasReducer from '../features/monedas/MonedasSlice'
import DepartamentosSlice,{departamentosSlice} from "../features/departamentos/DepartamentosSlice";

export const store = configureStore({

    reducer: {
        transacciones: transaccionesReducer,
        monedas: monedasReducer,
        departamentos: DepartamentosSlice, 
    },
})

