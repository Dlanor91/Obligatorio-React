import React, { useState,useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import "./Registro.css";
import Label from './label/Label';
import Input from './input/Input';
import Option from './option/Option';

const Registro = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (name, value) => {
    name === "usuario" ? setUser(value) : setPassword(value);
  };
   
  const [ciudades, setCiudades] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  let idDepartamento = 3213;

  useEffect(() => {
    fetch("https://crypto.develotion.com/departamentos.php")
  .then(r => r.json())
  .then(datos => {
    //console.log(datos);    
    setCiudades(datos.departamentos);         
  })
  }, [])

  useEffect(() => {
    fetch(`https://crypto.develotion.com/ciudades.php?idDepartamento=${idDepartamento}`)
  .then(r => r.json())
  .then(datos => {
    console.log(datos);    
    setDepartamentos(datos.ciudades);         
  })
  }, [])
  
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
          <Form.Select className="w-50 m-2"> 
          {ciudades.map(ciudad => <option key={ciudad.id} id={ciudad.id}>{ciudad.nombre}</option>)}
          </Form.Select>
        </Row>
        <Row className = "justify-content-center mb-3"> 
          <Form.Select className="w-50 m-2">
          {departamentos.map(dep => <option key={dep.id} id={dep.id}>{dep.nombre}</option>)}
          </Form.Select>   
        </Row>         
        <Row className = "justify-content-center mb-3">
          <input type="button" className="w-50 btn btn-dark btn-block" value="Registrarse"/>
        </Row>
      </Form>
    </Container>
  )
}

export default Registro

 /* <Option key={ciudad.id} id={ciudad.id} nombre={ciudad.nombre}/>*/