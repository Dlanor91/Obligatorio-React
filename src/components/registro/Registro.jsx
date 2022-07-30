import React, { useState, useEffect, useRef } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import "./Registro.css";
import Label from './label/Label';
import Input from './input/Input';
import * as yup from 'yup'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import { apiRegistro } from '../../services/serviciosApi';
/* import Option from './option/Option'; */

const Registro = () => {

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
        onSubmit: (values) => registro(values)
    });

    const registro = async (usuario) => {

        try {
            console.log('usuario', usuario);
            const respuesta = await apiRegistro(usuario);
            console.log('respuesta', respuesta);
            localStorage.setItem("usuario", JSON.stringify(usuario));
            sessionStorage.setItem("DatosLog", JSON.stringify(respuesta));
            const dataLog = JSON.parse(sessionStorage.getItem("DatosLog"));
            alert(dataLog.apiKey);
        } catch (error) {
            alert(error);
        }
    }

    const [datosUsuario, setDatosUsuario] = useState({
        user: '',
        password: ''
    })

    const handleChange = (event) => {
        /* console.log(event.target.name)
        console.log(event.target.value) */
        setDatosUsuario({
            ...datosUsuario,
            [event.target.name]: event.target.value
        })
        /* console.log(datosUsuario); */
    }

    const [departamentos, setDepartamentos] = useState([]);
    const [ciudades, setCiudades] = useState([]);

    const [idDepartamento, setIdDepartamento] = useState(0);
    const [idCiudad, setIdCiudad] = useState(0);

    const capturarIdDepartamento = (event) => {
        setIdDepartamento(event.currentTarget.value)
        setIdCiudad(0);
    }

    const capturarIdCiudad = (event) => {
        /* console.log(event.target.value); */
        setIdCiudad(event.target.value);
    }

    const btnRegistro = () => {
        const datos = { usuario: `${datosUsuario.user}`, password: `${datosUsuario.password}`, departamento: `${idDepartamento}`, ciudad: `${idCiudad}` }
        console.log(datos);
    }
    useEffect(() => {
        fetch("https://crypto.develotion.com/departamentos.php")
            .then(r => r.json())
            .then(datos => {
                //console.log(datos);    
                setDepartamentos(datos.departamentos);
            })
    }, [departamentos])
    const selectDepartamentos = [{ id: 0, nombre: "Seleccione un Departamento..." }, ...departamentos];


    useEffect(() => {
        fetch(`https://crypto.develotion.com/ciudades.php?idDepartamento=${idDepartamento}`)
            .then(r => r.json())
            .then(datos => {
                setCiudades(datos.ciudades);
            })
    }, [ciudades])
    const selectCiudades = [{ id: 0, nombre: "Seleccione una Ciudad..." }, ...ciudades];

    return (
        <Container className='align-content-center'>
            <Form className='formulario' onSubmit={formik.handleSubmit}>
                <h2 className='formulario-titulo py-2'>Registro</h2>
                <Row className="justify-content-center m-3">
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
                </Row>
                <Row className="justify-content-center mb-3">
                    <Label texto="Contraseña" htmlEnlace="password" />
                    <Input attribute={{
                        id: "password",
                        name: "password",
                        type: "password",
                        placeholder: "Contraseña...",
                    }}
                        handleChange={handleChange}
                    />
                </Row>
                <Row className="justify-content-center mb-3">
                    <Form.Select className="w-50 m-2" onChange={capturarIdDepartamento}>
                        {selectDepartamentos.map(dep => <option key={dep.id} value={dep.id}>{dep.nombre}</option>)}
                    </Form.Select>
                </Row>
                <Row className="justify-content-center mb-3" >
                    <Form.Select className="w-50 m-2" onChange={capturarIdCiudad}>
                        {(idDepartamento != 0) ?
                            selectCiudades.map(city => <option key={city.id} value={city.id}>{city.nombre}</option>)
                            : <option>Seleccione un Departamento ...</option>}
                    </Form.Select>
                </Row>
                <Row className="justify-content-center mb-3">
                    <button
                                    type="submit"
                                    className="btn btn-dark btn-block m-3 w-50"
                                >
                                    Registrarse{" "}
                                </button>
                </Row>
            </Form>
        </Container>
    )
}

export default Registro
