import React from "react";
import "./App.css";

import Login from "./components/login/Login";
import Registro from "./components/registro/Registro";

import {store} from './store/Store'
import {Provider} from 'react-redux'
import Transacciones from './components/dashboard/transacciones/Transacciones'
import Dashboard  from "./components/dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      
        <Provider store ={store} >
      
        <Login />
        <Registro /> 
        <Dashboard/>

      </Provider>
    </div>

export default App;
