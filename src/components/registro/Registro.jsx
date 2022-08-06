import React, { useState, useEffect, useRef } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import "./Registro.css";
import * as yup from 'yup'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import { apiRegistro } from '../../services/ServiciosApi';
import { useDispatch, useSelector } from 'react-redux';
import { guardarCiudades } from '../../features/ciudades/CiudadesSlice';
import { guardarDepartamentos } from '../../features/departamentos/DepartamentosSlice'
import { useNavigate } from 'react-router-dom';

const Registro = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const mostrarDepartamentos = useSelector((state) => state.departamentos.departamentos);
    const mostrarCiudades = useSelector(state => state.ciudades.ciudades);;

    //const [idDepartamento, setIdDepartamento] = useState(0);
    const refCiudad = useRef(0);


    const validationSchema = yup.object({
        usuario: yup
            .string('Ingrese su usuario')
            .required('El usuario no puede estar vacío.'),
        password: yup
            .string('Ingrese su contraseña')
            .required('La contraseña no puede estar vacía.'),
        idDepartamento: yup
            .string('Ingrese un Departamento')
            .required('Seleccione un departamento ....'),
    });

    const formik = useFormik({
        initialValues: {
            usuario: '',
            password: '',
            idDepartamento: '',
            idCiudad: 0
        },
        validationSchema: validationSchema,
        onSubmit: (values) => registro(values)
    });

    const registro = async (usuario) => {
        try {
            console.log(usuario);
            const respuesta = await apiRegistro(usuario);

            if (respuesta != undefined) {
                alert("Usuario registrado correctamente.")
                navigate("/Login");
            }

        } catch (error) {
            alert(error);
        }
    }

    /* const capturarIdDepartamento = (event) => {
        setIdDepartamento(event.currentTarget.value);
    } */

    useEffect(() => {

        fetch(`https://crypto.develotion.com/departamentos.php`)
            .then(r => r.json())
            .then(datos => {

                switch (datos.codigo) {
                    case 200:
                        dispatch(guardarDepartamentos(datos.departamentos))
                        break;
                    default:
                        alert("No se obtuvo una respuesta correcta.");
                        break;
                }
            })
            .catch((error) => Promise.reject(error.mensaje ? error.mensaje : "Ah ocurrido un error, vuelva a intentarlo mas tarde"));
    }, [])

    useEffect(() => {

        fetch(`https://crypto.develotion.com/ciudades.php?idDepartamento=${formik.values.idDepartamento}`)
            .then(r => r.json())
            .then(datos => {

                switch (datos.codigo) {
                    case 200:
                        dispatch(guardarCiudades(datos.ciudades))
                        break;
                    default:
                        alert("No se obtuvo una respuesta correcta.");
                        break;
                }
            })
            .catch((error) => Promise.reject(error.mensaje ? error.mensaje : "Ah ocurrido un error, vuelva a intentarlo mas tarde"));

    }, [formik.values.idDepartamento])

    return (
        <Container className='align-content-center container'>
            <Form className='formulario' onSubmit={formik.handleSubmit} >
                <h2 className='formulario-titulo py-2'>Registro</h2>
                <Row className="justify-content-center py-1 mb-3">
                    <TextField
                        fullWidth
                        className="w-50"
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
                        id="password"
                        name="password"
                        label="Contraseña"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </Row>                
                <Grid item xs={12} sm={12} className="mb-2">
                <FormControl sx={{m:0,minWidth: '50%' ,
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
                                            }}>
                                            <InputLabel id="demo-simple-select-standard-label">Departamentos</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-standard-label"
                                                id="idDepartamento"
                                                name='idDepartamento'
                                                value={formik.values.idDepartamento}
                                                onChange={formik.handleChange}
                                                label="Departamentos"                           
                                            >
                                                <MenuItem value="">
                                                    <em>Seleccione un departamento</em>
                                                </MenuItem>
                                                {mostrarDepartamentos.map((dep) => (
                                                    <MenuItem
                                                        key={dep.id}
                                                        value={dep.id}
                                                    >
                                                        {dep.nombre}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <FormHelperText error>{formik.touched.idDepartamento && formik.errors.idDepartamento}</FormHelperText>
                    </FormControl>  
                </Grid>
                {formik.values.idDepartamento != "" && <Row className="justify-content-center mb-2" >
                    <Form.Select
                        id="idCiudad"
                        name="idCiudad"
                        className="w-50 m-2"
                        ref={refCiudad}
                        onChange={formik.handleChange}
                        value={formik.values.idCiudad}
                    >
                        <option key="0" value="0">Seleccione una Ciudad ...</option>
                        {mostrarCiudades?.map(city => <option key={city.id} value={city.id}>{city.nombre}</option>)}

                    </Form.Select>
                </Row>}
                <Row className="justify-content-center mb-3">

                    <button
                        //disabled={!formik.values.password || !formik.values.usuario || formik.values.idDepartamento == 0 || formik.values.idCiudad == 0}
                        type="submit"
                        className="btn btn-dark btn-block px-1 mx-0 w-25"
                    >
                        Registrarse{" "}
                    </button>
                    <button
                        type="submit"
                        className="btn btn-dark btn-block mx-2 w-25"
                        onClick={() => navigate("/Login")}
                    >
                        Ingresar{" "}
                    </button>
                </Row>
            </Form>
        </Container>
    )
}

export default Registro
