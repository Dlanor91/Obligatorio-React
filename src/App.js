import React from "react";
import "./App.css";

import Login from "./components/login/Login";
import Registro from "./components/registro/Registro";
import { store } from "./store/Store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Login />
      <Registro />
    </Provider>
  );
}

export default App;
