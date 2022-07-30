import React from "react";
import Titulo from "./titulo/Titulo";
import "./Login.css";
import { apiLogin } from "../../services/serviciosApi";
import * as yup from 'yup'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'

const Login = () => {

    const validationSchema = yup.object({
        usuario: yup
            .string('Ingrese su usuario')
            .required('El usuario no puede estar vacio'),
        password: yup
            .string('Ingrese su contraseña')
            .required('La contraseña no puede estar vacia'),
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
            alert(dataLog.apiKey);
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
                                    name="password"
                                    label="Password"
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
                            </div>

                        </form>
                    </div>

                    <div className="card-footer ">
                        <div className="text-center">
                            <span>No tienes cuenta?{" "}
                                <a id="registro" href="#!">
                                    Create una!
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
