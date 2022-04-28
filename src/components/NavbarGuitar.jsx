import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import fireApp from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { Navbar,Container, Nav } from "react-bootstrap";


const auth = getAuth(fireApp);

const NavbarGuitar = (props) => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <Navbar expand="md" className="navBarGuitar">
      <Container>
        <Navbar.Brand href="#home">Guitarras Custom</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            marginRight: "0px",
            width: "100%"
          }}>
            {props.firebaseUser !== null ? (
              <>
                <NavLink className="btn btn-dark mr-2" to="/products">
                  Guitarras
                </NavLink>
                <button
                  className="btn btn-dark mr-2"
                  onClick={() => cerrarSesion()}>
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <NavLink className="btn btn-dark mr-2" to="/login">
                  Iniciar sesión
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarGuitar;




