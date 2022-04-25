import React from "react";
import fireApp, { db } from "../firebase/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";


const auth = getAuth(fireApp);

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const [isRegistro, setIsRegistro] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!auth.currentUser) {
      setUser(auth.currentUser);
    } else {
      navigate("/");
    }
  }, [navigate]);

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
      setError("El password debe ser mayor a 7 caracteres");
      return;
    }
    setError(null);

    if (isRegistro) {
      registrar();
    } else {
      login();
    }

    console.log(user)
  };

  const login = React.useCallback(async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log(res);
      setEmail("");
      setPassword("");
      setError(null);
      navigate("/");
    } catch (error) {
      console.log(error);
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
      });
      setEmail("");
      setPassword("");
      setError(null);
      navigate("/products");
      //console.log(res);
    } catch (error) {
      console.log(error);
      if (error.message === "Firebase: Error (auth/invalid-email).") {
        setError("El email no es válido");
      }
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("El email ya está registrado");
      }
    }
  }, [email, password, navigate]);

  return (
    <>
      <div className="mt-6 insideLogin">
        <h3 className="text-center">
          {isRegistro ? "Registrarse" : "Iniciar sesion"}
        </h3>
        <hr />
        <div className="row justify-content-center" style={{width: "100%"}}>
          <div className="">
            <form onSubmit={recibirDatos} style={{justifyContent:"center", alignItems: "center", display: "flex", flexDirection: "column"}}>
              {error && <div className="alert alert-danger">{error}</div>}
              <input
                type="email"
                className="form-control mb-2 formStyle"
                placeholder="Ingrese un email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                className="form-control mb-2 formStyle"
                placeholder="Ingrese un password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {isRegistro && (
                <div>Esta es una prueba</div>
              )}
              <div className="buttonsLogin">
                <button className="buttonLoginRegister" type="submit">
                  {isRegistro ? "Registrarse" : "Iniciar sesion"}
                </button>
                <a
                  className="optionsNoLogin"
                  onClick={() => setIsRegistro(!isRegistro)}
                  type="button"

                >
                  {isRegistro ? "Ya estoy registrado" : "No tengo una cuenta"}
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
