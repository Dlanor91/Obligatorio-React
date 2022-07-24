import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import "./Registro.css";

const Registro = () => {
  return (
    <Container className='align-content-center'>      
      <Form className='formulario '> 
      <h2 className='formulario-titulo py-2'>Registro</h2>
      <Row className = "justify-content-center mb-3">    
        <label htmlFor='user'>Usuario</label>
        <input type="text" id='user' className="w-50 form-control" placeholder="Usuario ..."/> 
      </Row>
      <Row className = "justify-content-center mb-3">
        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" className="w-50 form-control" placeholder="Contraseña ..." /> 
      </Row>
      <Row className = "justify-content-center mb-3">
        <Form.Select className="w-50"> 
          <option>Seleccione un Departamento</option>
        </Form.Select>
      </Row>
      <Row className = "justify-content-center mb-3">  
        <Form.Select className="w-50">
          <option>Seleccione una Ciudad</option>
        </Form.Select >
      </Row> 
      <Row className = "justify-content-center mb-3">
        <input type="button" className="w-50 btn btn-dark btn-block" value="Registrarse"/>
      </Row>
      </Form>
    </Container>
 
   
  )
}

export default Registro