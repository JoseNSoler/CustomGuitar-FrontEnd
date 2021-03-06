import React from "react";
import fireApp, { db } from "../firebase/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const auth = getAuth(fireApp);

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [error, setError] = React.useState(null);
  const [isRegistro, setIsRegistro] = React.useState(false);
  const [username, setUsername] = React.useState("");

  const navigate = useNavigate();

  const recibirDatos = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Ingrese Email");
      return;
    }

    if (!password.trim()) {
      setError("Ingrese Password");
      return;
    }

    if (password.length < 8) {
      setError("El password no debe ser menor a 8 caracteres");
      return;
    }

    if (!password.match(/[A-z]/)) {
      setError("El password debe contener al menos una letra");
      return;
    }

    if (!password.match(/[A-Z]/)) {
      setError("El password debe contener al menos una mayúscula");
      return;
    }

    if (!password.match(/\d/)) {
      setError("El password debe contener al menos un número");
      return;
    }

    if (isRegistro) {
      if (password !== confirm) {
        setError("El password no coincide, rectifique por favor");
        return;
      }

      if (username.length < 3) {
        setError("El Username debe tener al menos 3 caracteres");
        return;
      }

      if (username.length > 30) {
        setError("El Username debe tener menos de 30 caracteres");
        return;
      }
    }

    setError(null);

    if (isRegistro) {
      registrar();
    } else {
      login();
    }
    
  };

  const login = React.useCallback(async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);      
      setEmail("");
      setPassword("");
      setError(null);
      navigate("/");
    } catch (error) {
      console.log("error.FirebaseError")
      if (error.message === "Firebase: Error (auth/user-not-found).") {
        setError("El email es incorrecto o no está registrado");
      }
      if (error.message === "Firebase: Error (auth/wrong-password).") {
        setError("El password es incorrecto o el email no está registrado");
      }
    }
  }, [email, password, navigate]);

  const registrar = React.useCallback(async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "usuarios"), {
        email: res.user.email,
        uid: res.user.uid,
        displayName: username
      });
      updateProfile(auth.currentUser, {
        displayName: username,
      });
      setEmail("");
      setPassword("");
      setError(null);
      navigate("/products");
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        setError("El email no es válido");
      }
      if (
        error.message === "Firebase: Error (auth/email-already-in-use)."
      ) {
        setError("El email ya está registrado");
      }
    }
  }, [email, password, username, navigate]);

  return (
    <>
      <div className="mt-6 insideLogin">
        <h3 className="text-center">
          {isRegistro ? "Registro de usuarios" : "Login de acceso"}
        </h3>
        <hr />
        <div className="row justify-content-center" style={{ width: "100%" }}>
          <div className="">
            <form
              onSubmit={recibirDatos}
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}>
              {error && (
                <div className="alert alert-danger" id="errorForm">
                  {error}
                </div>
              )}
              <input
                type="email"
                className="form-control mb-2 formStyle"
                placeholder="Ingrese un email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                className="form-control mb-2 formStyle"
                placeholder="Ingrese un password"
                id="pass"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {isRegistro && (
                <input
                  type="password"
                  id="confirm"
                  className="form-control mb-2 formStyle"
                  placeholder="Confirme su password"
                  onChange={(e) => setConfirm(e.target.value)}
                  value={confirm}
                />
              )}

              {isRegistro && (
                <input
                  type="text"
                  id="username"
                  className="form-control formStyle"
                  placeholder="Escriba su Username"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  required
                />
              )}
              <div className="buttonsLogin">
                <button
                  className="buttonLoginRegister"
                  type="submit"
                  id="buttonLoginRegister">
                  {isRegistro ? "Registrarse" : "Iniciar sesión"}
                </button>
                <button
                  className="optionsNoLogin"
                  onClick={() => setIsRegistro(!isRegistro)}
                  style={{border: '0px'}}
                  type="button"
                  id="optionRegisterLogin">
                  {isRegistro ? "Ya estoy registrado" : "No tengo una cuenta"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
