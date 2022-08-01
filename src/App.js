import React from "react";
import "./App.css";

import Login from "./components/login/Login";
import Registro from "./components/registro/Registro";

import { store } from "./store/Store";
import { Provider } from "react-redux";
import Transacciones from "./components/dashboard/transacciones/Transacciones";
import IngresarTransaccion from "./components/dashboard/transacciones/IngresarTransaccion";
import Monedas from "./components/dashboard/monedas/Monedas";
import Dashboard from "./components/dashboard/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="Login" element={<Login />} />
            <Route path="Registro" element={<Registro />} />
            <Route path="Transacciones" element={<Transacciones />} />
            <Route path="Monedas" element={<Monedas />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
        </BrowserRouter>
        {/* <Routes>
            <Route path="/" element={Dashboard}></Route> */}
        {/* <Login /> */}
        {/* <Registro /> */}
        {/* <Dashboard /> */}
        {/* </Routes>
        </BrowserRouter> */}
      </Provider>
    </div>
  );
};
export default App;
