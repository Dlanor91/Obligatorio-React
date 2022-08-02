import React from "react";
import Titulo from "./titulo/Titulo";
import "./Login.css";
import { apiLogin } from "../../services/ServiciosApi";
import * as yup from 'yup'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import { Link, useNavigate } from "react-router-dom";
import Monedas from "../dashboard/monedas/Monedas";
import Transacciones from "../dashboard/transacciones/Transacciones";
import { useSelector } from "react-redux";

const Login = () => {
    const navigate = useNavigate();
    const validationSchema = yup.object({
        usuario: yup
            .string('Ingrese su usuario')
            .required('El usuario no puede estar vacío.'),
        password: yup
            .string('Ingrese su contraseña')
            .required('La contraseña no puede estar vacía.'),
    });

    const formik = useFormik({
        initialValues: {
            usuario: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => Logueo(values)
    });

    const Logueo = async (usuario) => {

        try {
            //console.log('usuario', usuario);
            const respuesta = await apiLogin(usuario);
            //console.log('respuesta', respuesta);
            localStorage.setItem("usuario", JSON.stringify(usuario));
            sessionStorage.setItem("DatosLog", JSON.stringify(respuesta));
            const dataLog = JSON.parse(sessionStorage.getItem("DatosLog"));
            
            
            navigate("/");
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card align-items-center">
                    <div className="card-header">
                        <Titulo text="Bienvenido" />
                    </div>
                    
                    <div className="card-body">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group m-3">
                                <TextField
                                    fullWidth
                                    sx={{
                                        input: {
                                            color: "white",
                                            backgroundColor: "grey",

                                        },
                                        label: {
                                            color: "white",
                                            borderColor: "white",
                                        },
                                        fieldset: {
                                            color: "white"
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: "white"
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "yellow"
                                            }
                                        },
                                        "& label.Mui-focused": {
                                            color: "yellow"
                                        }
                                    }}
                                    id="usuario"
                                    name="usuario"
                                    label="Usuario"
                                    value={formik.values.usuario}
                                    onChange={formik.handleChange}
                                    error={formik.touched.usuario && Boolean(formik.errors.usuario)}
                                    helperText={formik.touched.usuario && formik.errors.usuario}
                                />
                            </div>

                            <div className="form-group m-3">
                                <TextField
                                    fullWidth
                                    sx={{
                                        input: {
                                            color: "white",
                                            backgroundColor: "grey"
                                        },
                                        Label: {
                                            color: "white"
                                        },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                borderColor: "white"
                                            }, "&.Mui-focused fieldset": {
                                                borderColor: "yellow"
                                            }
                                        },
                                        "& label.Mui-focused": {
                                            color: "yellow"
                                        }
                                    }}
                                    id="password"
                                    type="password"
                                    name="password"
                                    label="Contraseña"                                    
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />

                            </div>

                            <div className="form-group mt-3">
                                <button
                                    disabled={!formik.values.password || !formik.values.usuario}
                                    type="submit"
                                    className="btn btn-dark btn-block m-3"
                                >
                                    Ingresar{" "}
                                </button>
                                <button                                    
                                    type="submit"
                                    className="btn btn-dark btn-block m-3"
                                    onClick={() => navigate("/Registro")}
                                >
                                    Registrarse{" "}
                                </button>
                            </div>

                        </form>                    
                    </div>                    
                </div>
            </div>
        </div>
    );
};

export default Login;
