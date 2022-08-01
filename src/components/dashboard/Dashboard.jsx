import React from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link } from 'react-router-dom';

const Dashboard = () => {
    const dataLog = JSON.parse(sessionStorage.getItem("DatosLog"));       
    
    if(dataLog != null) {
        return (<div>      
            <Navbar className='navBg' bg="light" expand="lg">
             <Container>
               <Navbar.Brand as={Link}>Obligatorio</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                 <Nav className="me-auto"> 
                   <Nav.Link as={Link} to="Transacciones">Transacciones</Nav.Link>  
                   <Nav.Link as={Link} to="Monedas">Monedas</Nav.Link> 
                   <Nav.Link as={Link} to="IngresarTransaccion">Ingresar Transacción</Nav.Link>
                 </Nav>
               </Navbar.Collapse>
             </Container>
            </Navbar>
            <section>
                <Outlet/>
            </section>
           </div> 
         )
    } else {
        return (
            <div>
            <Navbar className='navBg' bg="light" expand="lg">
             <Container>
               <Navbar.Brand href="#home">Obligatorio</Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                 <Nav className="me-auto"> 
                   <Nav.Link as={Link} to="Login">Login</Nav.Link>  
                   <Nav.Link as={Link} to="Registro">Registro</Nav.Link>            
                 </Nav>
               </Navbar.Collapse>
             </Container>
            </Navbar>
            <section>
                <Outlet/>
            </section>
            
           </div>
        )
    }
    
     
   
}

export default Dashboard