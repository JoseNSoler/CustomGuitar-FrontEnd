import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import fireApp from "../firebase/firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth(fireApp);

const Navbar = (props) => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  return (
    <div
      className="navbar navbar-dark navBarGuitar"
      style={{ padding: 0, height: "3.2rem", backgroundColor: "black" }}>
      <div className="container" style={{ backgroundColor: "black" }}>
        <Link
          className="navbar-brand "
          to="/"
          style={{ backgroundColor: "black" }}>
          Guitarras Custom
        </Link>
        <div style={{ backgroundColor: "black" }}>
          <div className="d-flex" style={{ backgroundColor: "black" }}>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
