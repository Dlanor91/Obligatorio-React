import React from 'react'
import {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {crearTransaccion} from '../../../features/transacciones/TransaccionesSlice'
import * as yup from 'yup'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import Row from '@mui/material/TextField'
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { ApiTransaccion } from "../../../services/ServiciosApi";


const IngresarTransaccion = () => {

    const dataLog = JSON.parse(sessionStorage.getItem("DatosLog"));
    const monedas= useSelector(state => state.monedas.monedas)
    
    console.log(monedas)

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

    const AgregarTransaccion = async (transaccion) => {
        try {
            const respuesta= await ApiTransaccion(transaccion);
        } catch (error) {
            alert(error);
        }          
    }
    if(monedas.length !== 0){
        return (
          

    <Container className='align-content-center'>

            <Form className='formulario' onSubmit={formik.handleSubmit}>

                <h2 className='formulario-titulo py-2'>Transacciones</h2>

                <Row className="justify-content-center mb-3"> 
                    <Form.Select 
                                id="tipoDeOperacion" 
                                name="tipoDeOperacion"
                                className="w-50 m-2" 
                                onChange={formik.handleChange} 
                                value={formik.values.tipoDeOperacion}                                                   
                    >  
                        <option key="0" value="0">Seleccione un Departamento ...</option> 
                        <option key="1" value={1}> Compra</option>
                        <option key="2" value={2}> Venta</option>
                    </Form.Select>
                </Row>

                <Row className="justify-content-center mb-3" >                
                    <Form.Select
                        id="idCiudad" 
                        name="idCiudad" 
                        className="w-50 m-2" 
                        onChange={formik.handleChange}
                        value={formik.values.moneda}
                    >
                        <option key="0" value="0">Seleccione una Ciudad ...</option>  
                         {monedas.monedas.map(mon => <option key={mon.id} value={mon.id}>{mon.nombre}</option>)}
                                                                 
                    </Form.Select>
                </Row> 

                <Row className="justify-content-center mb-3">
                <TextField
                    fullWidth
                    className="w-50"
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
                    name="cantidad"
                    label="Cantidad"
                    type="number"
                    value={formik.values.cantidad}
                    onChange={formik.handleChange}
                    error={formik.touched.cantidad && Boolean(formik.errors.password)}
                    helperText={formik.touched.cantidad && formik.errors.cantidad}
                />
                </Row>

                <Row className="justify-content-center mb-3">
                
                    <button
                        disabled={!formik.values.password || !formik.values.usuario || formik.values.idDepartamento == 0 || formik.values.idCiudad == 0 }
                        type="submit"
                        className="btn btn-dark btn-block m-3 w-50"
                            >
                                Registrarse{" "}
                            </button>
                </Row>                               
            </Form>
        </Container>                          
    ) } else 
    {
        return <div> No hay conexion</div>
    }
}

export default IngresarTransaccion