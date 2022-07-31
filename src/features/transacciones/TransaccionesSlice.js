import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    transacciones:[]
}

export const tranSlice = createSlice ({

    name:"transacciones",
    initialState,
    reducers: {
        guardarTransacciones:(state,action) => {
            state.transacciones = action.payload;
        }
    }


});

export const {guardarTransacciones} = tranSlice.actions;
export default tranSlice.reducer;