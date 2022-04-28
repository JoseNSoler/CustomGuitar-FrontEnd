import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import fireApp from "./firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginRegisterView from "./pageviews/LoginRegisterView";
import Products from "./pageviews/Products";

import "./scss/App.scss";
import "./scss/NavBar.scss";
import "./scss/Footer.scss";
import Order from "./pageviews/Order";
import Footer from "./components/Footer";
import { Container, Spinner } from "react-bootstrap";

const auth = getAuth(fireApp);

function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseUser(user);
      } else {
        setFirebaseUser(null);
      }
    });
  }, []);

  const boolLogin = firebaseUser ? <Navigate to={"/"} /> : <LoginRegisterView />
  const boolRelative = firebaseUser ? (
    <Navigate to="/products" />
  ) : (
    <Navigate to={"/login"} />
  )

  const boolProducts = firebaseUser ? <Products /> : <Navigate to={"/login"} />
  const boolOrder = firebaseUser ? <Order /> : <Navigate to={"/login"} />

  return firebaseUser !== false ? (
    <Router>
      <div className="App">
        <Navbar firebaseUser={firebaseUser} />
        <Routes>
          <Route
            path="/"
            element={
              boolRelative
            }
          />
          <Route
            path="/login"
            element={
              boolLogin
            }
          />
          <Route
            path="/products"
            element={boolProducts}
          />
          <Route
            path="/:uid/order/:id"
            element={boolOrder}
          />
          <Route path="*" element={<h1>404 NotFoundPage</h1>} />
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  ) : (
    <Container>
      <Spinner
        animation="grow"
        variant="dark"
        style={{ position: "absolute", left: "50%", top: "50%" }}
      />
    </Container>
  );
}

export default App;
