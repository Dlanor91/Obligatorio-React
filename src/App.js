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
import { Link } from "react-router-dom";
import CerrarSesion from "./components/dashboard/cerrarSesion/CerrarSesion";
import MontoFinal from "./components/dashboard/montoTotal/MontoFinal";
import Grafica from "./components/dashboard/graficas/Grafica";
import ValoresMoneda from "./components/dashboard/graficas/ValoresMoneda";
import GraficoCompras from "./components/dashboard/graficas/GraficoCompras";
import GraficoVentas from "./components/dashboard/graficas/GraficoVentas";

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/Registro" element={<Registro />} />
            <Route path="/" element={<Dashboard />}>
              <Route index element={<Transacciones />} />
              <Route
                path="/IngresarTransaccion"
                element={<IngresarTransaccion />}
              />
              <Route
                path="/Graficas/GraficaCompras"
                element={<GraficoCompras />}
              />
              <Route
                path="/Graficas/GraficaVentas"
                element={<GraficoVentas />}
              />
              <Route
                path="/Graficas/ValoresMoneda"
                element={<ValoresMoneda />}
              />
              <Route path="/Monedas" element={<Monedas />} />
              <Route path="/CerrarSesion" element={<CerrarSesion />} />
            </Route>

            <Route
              path="*"
              element={
                <h3 className="mt-5 ">
                  Página no encontrada! Ir a <Link to="/Login">Login</Link>
                </h3>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};
export default App;
