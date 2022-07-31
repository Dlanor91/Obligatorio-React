import React, { useState, useEffect, useRef } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import "./Registro.css";
import * as yup from 'yup'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import { apiRegistro } from '../../services/ServiciosApi';
import { useDispatch,useSelector } from 'react-redux';
import { guardarDepartamentos } from '../../features/DepartamentosSlice';


const Registro = () => {

    const dispatchDep = useDispatch();
    const mostrarDepartamentos = useSelector(state => state.departamentos.departamentos)
    
    const validationSchema = yup.object({
        usuario: yup
            .string('Ingrese su usuario')
            .required('El usuario no puede estar vacío.'),
        password: yup
            .string('Ingrese su contraseña')
            .required('La contraseña no puede estar vacía.'), 
        idDepartamento: yup
            .number(0)
            .required('Seleccione un departamento ....'),        
    });    

    const formik = useFormik({
        initialValues: {
            usuario: '',
            password: '', 
            idDepartamento:0,
            idCiudad:0                    
        },
        validationSchema: validationSchema,
        onSubmit: (values) => registro(values)
    });

    const registro = async (usuario) => {
        try {           
            const respuesta = await apiRegistro(usuario);
            alert("Redirigir a login o cartel de ya registrado");
            //redirigir a login            
        } catch (error) {
            alert(error);
        }
    }  

    const [departamentos, setDepartamentos] = useState([]);
    const [ciudades, setCiudades] = useState([]);

    const [idDepartamento, setIdDepartamento] = useState(0);    

    const refCiudad = useRef(0);    

    const capturarIdDepartamento = (event) => {
        setIdDepartamento(event.currentTarget.value);   
    }
    
    //const departamentosMostrar = useSelector(state => state.departamentos.departamentos);

    useEffect(() => {
        fetch("https://crypto.develotion.com/departamentos.php")
            .then(r => r.json())
            .then(datos => {
                //console.log(datos);    
                //setDepartamentos(datos.departamentos);
                dispatchDep(guardarDepartamentos(datos))
            })
    }, [])
    //const selectDepartamentos = [{ id: 0, nombre: "Seleccione un Departamento..." }, ...mostrarDepartamentos];

    useEffect(() => {
        fetch(`https://crypto.develotion.com/ciudades.php?idDepartamento=${idDepartamento}`)
            .then(r => r.json())
            .then(datos => {
                setCiudades(datos.ciudades);
            })
    }, [ciudades])  
    
    useEffect (() =>{
        if(refCiudad.current){
            //console.log('refCiudad', refCiudad.current.value)            
        }
    })    

    return (
        <Container className='align-content-center'>
            <Form className='formulario' onSubmit={formik.handleSubmit}>
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
                <Row className="justify-content-center mb-3"> 
                   <Form.Select 
                                id="idDepartamento" 
                                name="idDepartamento"
                                className="w-50 m-2" 
                                onChange={formik.handleChange} 
                                onClick={capturarIdDepartamento} 
                                value={formik.values.idDepartamento}                                                   
                                >
                        {/* {selectDepartamentos.map(dep => <option key={dep.id} value={dep.id}>{dep.nombre}</option>)}
                         */}
                    </Form.Select> 
                </Row>
                {idDepartamento !=0 && <Row className="justify-content-center mb-3" >                
                    <Form.Select
                        id="idCiudad" 
                        name="idCiudad" 
                        className="w-50 m-2" 
                        ref={refCiudad}
                        onChange={formik.handleChange}
                        value={formik.values.idCiudad}
                    >
                        <option key="0" value="0">Seleccione una Ciudad ...</option>  
                        {ciudades.map(city => <option key={city.id} value={city.id}>{city.nombre}</option>)}
                                                                       
                    </Form.Select>
                </Row> }
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
    )
}

export default Registro
