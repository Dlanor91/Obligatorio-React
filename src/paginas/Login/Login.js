import React, { useState } from "react";
import Titulo from "./Componentes/Titulo/Titulo"
import Label from "./Componentes/Label/Label"
import Input from "./Componentes/Input/Input";
import "./Login.css";

const Login = () => {

    const [user, setUser]= useState("");
    const [password, setPassword]= useState("");

    const handleChange = (name,value) => {name === "usuario" ? setUser(value) : setPassword(value)};

    const handleSubmit= () => {
        let account = {user,password};

        if(account){
            console.log("account:", account);
        }           
    };

console.log("usuario:", user)
console.log("Password:", password)

    return (
       
            <div className="container">
                
                <div className="d-flex justify-content-center h-100">

                    <div className="card align-items-center">

                        <div className="card-header">
                            <Titulo text="Bienvenido" />
                        </div>

                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                        <Label text ="Usuario" />
                                        <Input
                                        attribute={{
                                            id: "usuario",
                                            name:"usuario",
                                            type:"text",
                                            placeholder: "Ingrese su Usuario"
                                        }}
                                        handleChange={handleChange}
                                        />
                                </div>

                                <div className="form-group">
                                    <Label text ="Contraseña" />
                                    <Input
                                    attribute={{
                                        id: "contraseña",
                                        name:"contraseña",
                                        type:"password",
                                        placeholder: "Ingrese su Contraseña"
                                    }}
                                    handleChange={handleChange}/>    
                                </div>

                                <div className="form-group mt-3">
                                    <button type="button" onClick={handleSubmit} className="btn btn-dark btn-block mb-4">Ingresar </button>
                                </div>
                                
                            </form>
                        </div>   

                        <div className="card-footer">
                            <div className="text-center">
                                <p>No tienes cuenta? <a  id="registro" href="#!">Create una!</a></p>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        

    )}

    export default Login;