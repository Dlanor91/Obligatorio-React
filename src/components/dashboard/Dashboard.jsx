import React from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';


const Dashboard = () => {
    const navigate = useNavigate();
    const dataLog = JSON.parse(sessionStorage.getItem("DatosLog"));       
    console.log(dataLog)
    if(dataLog == null){
      return <Navigate replace to={"/Login"}></Navigate>;
    } else {
        return (
            <div>
            <Navbar className='navBg' bg="light" expand="lg">
             <Container>
             {/* <Navbar.Brand href="/">Obligatorio React</Navbar.Brand> */}
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                 <Nav className="me-auto">                  
                   <Nav.Link as={Link} to="/">Transacciones</Nav.Link>
                   <Nav.Link as={Link} to="/IngresarTransaccion">Ingresar Transacción</Nav.Link>
                   <Nav.Link as={Link} to="/Monedas">Monedas</Nav.Link>                  
                   <Nav.Link as={Link} to="/CerrarSesion">Cerrar Sesión</Nav.Link>         
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