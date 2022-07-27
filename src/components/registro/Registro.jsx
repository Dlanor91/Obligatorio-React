import React, { useState,useEffect,useRef} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import "./Registro.css";
import Label from './label/Label';
import Input from './input/Input';
/* import Option from './option/Option'; */

const Registro = () => {

  const [datosUsuario, setDatosUsuario] = useState({
    user: '',
    password: ''
})
 
const handleChange = (event) => {
  /* console.log(event.target.name)
  console.log(event.target.value) */
  setDatosUsuario({
      ...datosUsuario,
      [event.target.name] : event.target.value
  })
  /* console.log(datosUsuario); */
}  

  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  
  const [cargando, setCargando] = useState(false);  
  const [idDepartamento, setIdDepartamento] = useState(0);
  const [idCiudad, setIdCiudad] = useState(0);

  const capturarIdDepartamento =(event)=>{    
    setIdDepartamento(event.currentTarget.value)
  }
  
  const capturarIdCiudad =(event)=>{
    /* console.log(event.target.value); */
    setIdCiudad(event.target.value);    
  }

  const btnRegistro = () =>{
    const datos = {usuario:`${datosUsuario.user}`, password:`${datosUsuario.password}`, departamento :{idDepartamento}, ciudad: {idCiudad}}
    console.log(datos);
  }
  useEffect(() => {
    fetch("https://crypto.develotion.com/departamentos.php")
  .then(r => r.json())
  .then(datos => {
    //console.log(datos);
    
    setDepartamentos(datos.departamentos);
  })
  }, [])

  
  useEffect(() => {    
    fetch(`https://crypto.develotion.com/ciudades.php?idDepartamento=${idDepartamento}`)
    .then(r => r.json())
    .then(datos => {
      /* console.log(cargando);  */
      (idDepartamento===0)? setCargando(false):setCargando(true); 
          
      setCiudades(datos.ciudades);                        
    })
   }, [ciudades])  
  
  return (
    <Container className='align-content-center'>      
      <Form className='formulario '> 
        <h2 className='formulario-titulo py-2'>Registro</h2>
        <Row className = "justify-content-center mb-3">    
          <Label texto="Usuario" htmlEnlace="user"/>
          <Input attribute={{
                    id: "user",
                    name: "user",
                    type: "text",
                    placeholder: "Usuario...",
                  }}
                  handleChange={handleChange}
          />                 
        </Row>
        <Row className = "justify-content-center mb-3">
          <Label texto="Contraseña" htmlEnlace="password"/>
          <Input attribute={{
                    id: "password",
                    name: "password",
                    type: "password",
                    placeholder: "Contraseña...",
                  }}
                  handleChange={handleChange}
          />  
        </Row>
        <Row className = "justify-content-center mb-3">
          <Form.Select className="w-50 m-2" onChange={capturarIdDepartamento}>          
           <option id='0'>Seleccione un departamento</option>
           {departamentos.map(dep => <option key={dep.id} value={dep.id}>{dep.nombre}</option>)}
          </Form.Select>
        </Row>
        <Row className = "justify-content-center mb-3" >
          <Form.Select className="w-50 m-2" onChange={capturarIdCiudad}>
           {(cargando)? 
                      ciudades.length !=0? ciudades.map(city=> <option key={city.id} value={city.id}>{city.nombre}</option>)
                        : <option>Seleccione un departamento ...</option>                   
                      : <option>Seleccione un departamento ...</option>}
          </Form.Select>          
        </Row>         
        <Row className = "justify-content-center mb-3">
          <input type="button" className="w-50 btn btn-dark btn-block" onClick={btnRegistro} value="Registrarse"/>
        </Row>
      </Form>
    </Container>
  )
}

export default Registro
