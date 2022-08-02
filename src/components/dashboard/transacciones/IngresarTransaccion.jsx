import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { crearTransaccion } from '../../../features/transacciones/TransaccionesSlice'
import "./IngresarTransaccion.css"
import * as yup from 'yup'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import Row from '@mui/material/TextField'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { ApiTransaccion } from "../../../services/ServiciosApi";
import Moneda from '../monedas/Monedas'

const IngresarTransaccion = () => {

    const dataLog = JSON.parse(sessionStorage.getItem("DatosLog"));
    const monedas = useSelector(state => state.monedas.monedas)
    const [idMoneda, setIdMoneda] = useState(0);
    const [moneda, setMoneda] = useState({})
    let valorMoneda = 0;

    useEffect(() => {

        setMoneda(monedas.monedas?.find(mon => mon.id === idMoneda));

    }, [idMoneda])

    console.log(idMoneda)

    console.log(moneda)

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
            idUsuario: null,
            tipoDeOperacion: null,
            moneda: null,
            cantidad: null,
            valorActual: null,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => AgregarTransaccion(values)
    });

    const capturarIdMoneda = (event) => {
        setIdMoneda(event.currentTarget.value);
    }

    const AgregarTransaccion = async (transaccion) => {
        try {
            const respuesta = await ApiTransaccion(transaccion);
        } catch (error) {
            alert(error);
        }
    }
    if (monedas.length !== 0) {
        return (

            <div className="container mt-5">
                <div className="d-flex justify-content-center h-100">
                    <div className="card align-items-center">
                        <div className="card-header">
                            <h1 text="Bienvenido" />
                        </div>

                        <div className="card-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="form-group m-3">
                                    <Form.Select
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
                                        helperText={formik.touched.usuario && formik.errors.usuario}>

                                        <option key="0" value="0">Seleccione tipo de transaccion ...</option>
                                        <option key="1" value="1">Compra</option>
                                        <option key="2" value="2">Venta</option>
                                    </Form.Select>
                                </div>

                                <div className="form-group m-3">
                                    <Form.Select
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
                                        onClick={capturarIdMoneda}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    >
                                        <option key="0" value="0">Seleccione una moneda ...</option>
                                        {monedas.monedas?.map(mon => <option key={mon.id} value={mon.id}>{mon.nombre}</option>)}
                                    </Form.Select>
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
                                        id="cantidad"
                                        type="number"
                                        name="cantidad"
                                        label="Cantidad"
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
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
                                        id="cotizacionActual"
                                        type="number"
                                        name="cotizacionActual"
                                        value={valorMoneda}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                </div>

                                <div className="form-group my-3">
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
                    </div>
                </div>
            </div>
        )
    } else {
        return <div> No hay conexion</div>
    }
}

export default IngresarTransaccion