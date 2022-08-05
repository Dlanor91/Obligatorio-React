import React from 'react'
import { useEffect, useState, useRef } from 'react'
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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate, useParams } from "react-router-dom";
import FormControl from '@mui/material/FormControl';
import Col from 'react-bootstrap/Col';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { CompressSharp } from '@mui/icons-material'

const IngresarTransaccion = () => {

    const dataLog = JSON.parse(sessionStorage.getItem("DatosLog"));
    const monedas = useSelector(state => state.monedas.monedas)
    const [idMoneda, setIdMoneda] = useState(0);
    const params = useParams();
    const tipoCompra = [{ id: 0, nombre: "Seleccione tipo de transaccion" }, { id: 1, nombre: "Compra" }, { id: 2, nombre: "Venta" }]

    const mostrarValor = (id) => {
        const mon = monedas.find(m => m.id == id);
        return mon.cotizacion;
    }

    const validationSchema = yup.object({
        tipoTran: yup
            .number('Seleccione Tipo de moneda')
            .required('El usuario no puede estar vacío.'),
        moneda: yup
            .number('Ingrese su contraseña')
            .required('La contraseña no puede estar vacía.'),
        cantidad: yup
            .number('Ingrese su contraseña')
            .required('La contraseña no puede estar vacía.'),
        cotizacionActual: yup
            .number('Ingrese su contraseña')
            .required('La contraseña no puede estar vacía.'),
    });

    const formik = useFormik({
        initialValues: {
            tipoTran: 0,
            moneda: 0,
            cantidad: 0,
            cotizacionActual: 0,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => { console.log(values) }
    });

    useEffect(() => {
        if (params.tareaId) {
            console.log(`object`, params);

        }
    }, []);


    const capturarIdMoneda = () => {
        console.log(formik.values.moneda)
        formik.values.cotizacionActual = mostrarValor(formik.values.moneda);
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

                                    <FormControl sx={{ m: 0, minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-standard-label">Moneda</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-standard-label"
                                            id="tipoTran"
                                            name='tipoTran'
                                            value={formik.values.moneda}
                                            onChange={formik.handleChange}
                                            label="Tipo de Transaccion"
                                        >
                                            <MenuItem value="">
                                                <em>Transaccion</em>
                                            </MenuItem>
                                            {tipoCompra.map((m) => (
                                                <MenuItem
                                                    key={m.id}
                                                    value={m.id}
                                                >
                                                    {m.nombre}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        <FormHelperText error>{formik.touched.moneda && formik.errors.moneda}</FormHelperText>
                                    </FormControl>
                                </div>

                                <div className="form-group m-3">
                                    <FormControl sx={{ m: 0, minWidth: '100%' }}>
                                        <InputLabel id="demo-simple-select-standard-label">Moneda</InputLabel>
                                        <Select
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
                                        <FormHelperText error>{formik.touched.moneda && formik.errors.moneda}</FormHelperText>
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
                                        error={formik.touched.cantidad && Boolean(formik.errors.cantidad)}
                                        helperText={formik.touched.cantidad && formik.errors.cantidad}
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
                                        value={formik.values.cotizacionActual}


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