import { configureStore } from "@reduxjs/toolkit";
import DepartamentosSlice,{departamentosSlice} from "../features/DepartamentosSlice";


export const store = configureStore({
    reducer:{
      departamentos: DepartamentosSlice 
    }
});