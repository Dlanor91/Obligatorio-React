import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { crearTransaccion } from '../../../features/transacciones/TransaccionesSlice'
import "./IngresarTransaccion.css"
import * as yup from 'yup'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import { ApiTransaccion } from "../../../services/ServiciosApi";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useParams } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';


const IngresarTransaccion = () => {

    const dataLog = JSON.parse(sessionStorage.getItem("DatosLog"));
    const monedas = useSelector(state => state.monedas.monedas)
    const [idMoneda, setIdMoneda] = useState(0);
    const params = useParams();

    const mostrarValor = (id) => {
        const mon = monedas.find(m => m.id == id);
        return mon != null ? mon.cotizacion : 0;
    }

    const validationSchema = yup.object({
        tipoOperacion: yup
            .number('Ingrese el tipo de transaccion por favor ')
            .required('Seleccione la transaccion por favor.'),
        moneda: yup
            .number('Ingrese la moneda por favor ')
            .required('Seleccione la moneda por favor.'),
        cantidad: yup
            .number('Ingrese la cantidad por favor ')
            .required('La cantidad no puede estar vacía.'),
        valorActual: yup
            .number('Seleccione la moneda para cargar el valor de la cotizacion')
            .required('La contraseña no puede estar vacía.'),
    });

    const formik = useFormik({
        initialValues: {
            tipoOperacion: "",
            moneda: "",
            cantidad: "",
            valorActual: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => AgregarTransaccion(values)
    });

    useEffect(() => {
        formik.values.valorActual = formik.values.moneda > 0 ? mostrarValor(formik.values.moneda) : 0;
    }, [formik.values.moneda]);


    const capturarIdMoneda = () => {
        console.log(formik.values.moneda)
        formik.values.valorActual = mostrarValor(formik.values.moneda);
    }

    const AgregarTransaccion = async (transaccion) => {

        try {
            const respuesta = await ApiTransaccion(transaccion);
            transaccion.id = respuesta.idTransaccion
            console.log(transaccion);
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

                                    <FormControl sx={{ m: 0, minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-standard-label"
                                            sx={{
                                                color: "white",
                                            }}
                                        >Tipo de Transaccion</InputLabel>

                                        <Select
                                            sx={{
                                                color: "white",
                                                borderColor: "white",
                                                select: {
                                                    color: "white",
                                                    backgroundColor: "grey"
                                                },
                                                Label: {
                                                    color: "white"
                                                },
                                                "&.MuiOutlinedInput-root": {
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
                                            labelId="demo-simple-select-standard-label"
                                            id="tipoOperacion"
                                            name='tipoOperacion'
                                            value={formik.values.tipoOperacion}
                                            onChange={formik.handleChange}
                                        >
                                            <MenuItem key={1} value={1}> Compra </MenuItem>
                                            <MenuItem key={2} value={2}> Venta </MenuItem>

                                        </Select>
                                        {/* <FormHelperText error>{formik.touched.tipoOperacion && formik.errors.tipoOperacion}</FormHelperText> */}
                                    </FormControl>
                                </div>

                                <div className="form-group m-3">
                                    <FormControl sx={{ m: 0, minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-standard-label"
                                            sx={{
                                                color: "white"
                                            }}
                                        >Moneda</InputLabel>
                                        <Select
                                            sx={{
                                                color: "white",
                                                borderColor: "white",
                                                select: {
                                                    color: "white",
                                                    backgroundColor: "grey"
                                                },
                                                Label: {
                                                    color: "white"
                                                },
                                                "&.MuiOutlinedInput-root": {
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
                                            labelId="demo-simple-select-standard-label"
                                            id="moneda"
                                            name='moneda'
                                            onClick={capturarIdMoneda}
                                            onChange={formik.handleChange}
                                            value={formik.values.moneda}
                                            label="Moneda"

                                        >
                                            <MenuItem value="">
                                                <em>Seleccione una moneda</em>
                                            </MenuItem>
                                            {monedas.map((m) => (
                                                <MenuItem
                                                    key={m.id}
                                                    value={m.id}
                                                >
                                                    {m.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {/* <FormHelperText error>{formik.touched.moneda && formik.errors.moneda}</FormHelperText> */}
                                    </FormControl>
                                    {/* <Form.Select
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
                                        id="moneda"
                                        name="moneda"
                                        label="Moneda"
                                        value={formik.values.moneda}
                                        onClick={capturarIdMoneda}
                                        onChange={formik.handleChange}

                                    >
                                        <option key="0" value="0">Seleccione una moneda ...</option>
                                        {monedas?.map(mon => <option key={mon.id} value={mon.id}>{mon.nombre}</option>)}
                                    </Form.Select> */}
                                </div>

                                <div className="form-group m-3">
                                    <TextField
                                        //fullWidth
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
                                        value={formik.values.cantidad}
                                        onChange={formik.handleChange}
                                    // error={formik.touched.cantidad && Boolean(formik.errors.cantidad)}
                                    // helperText={formik.touched.cantidad && formik.errors.cantidad}
                                    />
                                </div>

                                <div className="form-group m-3">
                                    <InputLabel id="demo-simple-select-standard-label"
                                        sx={{
                                            color: "white",
                                            fontSize: 12
                                        }}
                                    >Cotizacion Actual</InputLabel>

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
                                        id="valorActual"
                                        type="number"
                                        name="valorActual"
                                        value={formik.values.valorActual}
                                    />
                                </div>

                                <div className="form-group my-3">
                                    <button
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